#!/usr/bin/env node

const program = require('commander');
var utf8 = require('utf8');
const fs = require('fs');
// const Hash = require('chain3/lib/accounts/hash');
const exec = require('child_process').execSync;

program
  .version('1.0.0')
  .option('--file <file path>', 'file path')
  .option('--address <contract address>', 'contract address')
  .option('--abi <abi file>', 'abi file path')
  .parse(process.argv);

if (!(program.file)) {
  console.log('miss file parameter')
  process.exit();
}

if (!(program.address)) {
  console.log('miss contract address')
  process.exit();
}

if (!(program.abi)) {
  console.log('miss abi file')
  process.exit();
}

if (!fs.existsSync(program.file)) {
  console.log('no file in', program.file)
  process.exit();
}

let all = JSON.parse(fs.readFileSync(program.file, 'utf-8'))
var ret = [];
for (var i = 0; i < all.length; i++) {
  let cmd = 'jcc_moac_tool --abi ' + program.abi;
  cmd = cmd + ' --contractAddr "' + program.address + '" --method "queryCredit" --parameters \'';
  cmd = cmd + JSON.stringify(all[i]) + '\' ';

  console.log(cmd);

  var creditQuery = exec(cmd);

  if (creditQuery.toString().indexOf('false') !== -1) {
    ret.push(all[i]);
    console.log('No' + i, all[i], 'not register in list');
  }
}

console.log(ret);
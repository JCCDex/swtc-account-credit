#!/usr/bin/env node

const program = require('commander');
var utf8 = require('utf8');
const fs = require('fs');
const Hash = require('chain3/lib/accounts/hash');

program
  .version('1.0.0')
  .option('--file <file path>', 'file path')
  .option('--address <contract address>', 'contract address')
  .option('--abi <abi file>', 'abi file path')
  .option('--gas_limit <gas limit>', 'gas limit')
  .option('--nonce <nonce>', 'nonce')
  .option('--count <batch count>', 'batch count')
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

if (!(program.gas_limit)) {
  console.log('miss gas limit')
  process.exit();
}
if (!(program.nonce)) {
  console.log('miss nonce')
  process.exit();
}
if (isNaN(program.nonce)) {
  console.log('nonce must be number')
  process.exit();
}
let nonce = Number(program.nonce);

if (!(program.count)) {
  console.log('miss batch count')
  process.exit();
}

if (!fs.existsSync(program.file)) {
  console.log('no file in', program.file)
  process.exit();
}

let all = JSON.parse(fs.readFileSync(program.file, 'utf-8'))

for (var i = 0; i < all.length;) {
  let batch = [];
  let step = (all.length - i > program.count) ? program.count : all.length - i;
  for (; step > 0; step-- , i++) {
    batch.push(Hash.keccak256(all[i]));
  }
  let cmd = 'jcc_moac_tool --abi ' + program.abi;
  cmd = cmd + ' --contractAddr "' + program.address + '" --method "addSwtcAccountHashs" --parameters \'';
  cmd = cmd + JSON.stringify(batch) + '\' --gas_limit ' + program.gas_limit;
  cmd = cmd + ' --nonce ' + nonce;
  nonce = nonce + 1;
  console.log(cmd);
}


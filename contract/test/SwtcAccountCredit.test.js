/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-undef */
const SwtcAccountCredit = artifacts.require('SwtcAccountCredit');
const zeroAccount = require('./helpers/zeroAccount');
const assertRevert = require('./helpers/assertRevert');
const timeTravel = require('./helpers/timeTravel');

contract('SwtcAccountCredit', (accounts) => {
  let swtcCredit;
  let admin = accounts[0];
  let jt1 = "jnr7UGMZXkogBb7vSq8jqCo5twtUabHBue";

  beforeEach(async () => {
    swtcCredit = await SwtcAccountCredit.new({ from: admin });
  });

  it('HashList test', async () => {
    let k = web3.utils.keccak256(jt1);

    await swtcCredit.addSwtcAccountHashs([k]);

    let ret = await swtcCredit.queryCredit(jt1);
    assert.equal(ret, true);

    await swtcCredit.removeSwtcAccountHash(k);
    ret = await swtcCredit.queryCredit(jt1);
    assert.equal(ret, false);
  });
});

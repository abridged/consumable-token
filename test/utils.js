const BN = require('bn.js');

const {
  eth: {
    sign,
    getBalance: web3GetBalance,
    sendTransaction,
  },
  utils: {
    randomHex,
    soliditySha3,
    toWei,
    toHex,
    padLeft,
    sha3,
    fromWei,
    toChecksumAddress,
  },
} = web3;

function getRandomAddress() {
  return toChecksumAddress(randomHex(20));
}

function now(additionalSeconds = 0) {
  const add = BN.isBN(additionalSeconds)
    ? additionalSeconds.toNumber()
    : additionalSeconds;

  return new BN(Math.ceil(Date.now() / 1000) + add);
}

function getBalance(target) {
  const address = target && typeof target === 'object'
    ? target.address
    : target;

  return web3GetBalance(address)
    .then((value) => new BN(value, 10));
}

function logGasUsed({ receipt: { gasUsed } }) {
  // eslint-disable-next-line no-console
  console.log(
    `${' '.repeat(7)}⛽`,
    `gas used: ${gasUsed} ⤵︎`,
  );
}

function getCost({ receipt: { gasUsed } }, gasPrice) {
  return gasPrice.mul(new BN(gasUsed));
}

module.exports = {
  sha3,
  BN,
  soliditySha3,
  sign,
  toWei,
  toHex,
  fromWei,
  sendTransaction,
  padLeft,
  getRandomAddress,
  logGasUsed,
  getBalance,
  getCost,
  now,
};

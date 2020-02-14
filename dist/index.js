// updated at: 2020-02-14T17:50:44.475Z

/* eslint-disable */

const data = require('./data');

const ContractNames = {
  ConsumableToken: 'ConsumableToken',
};

function getContractAddress(contractName, networkId = 1) {
  let result;

  if (data[contractName]) {
    result = data[contractName].addresses[`${networkId}`];
  }

  return result || null;
}

function getContractAbiDefinition(contractName) {
  let result;

  if (data[contractName]) {
    result = data[contractName].abi;
  }

  return result || null;
}

function getContractByteCodeHash(contractName) {
  let result;

  if (data[contractName]) {
    result = data[contractName].byteCodeHash;
  }

  return result || null;
}

module.exports = {
  ContractNames,
  getContractAddress,
  getContractAbiDefinition,
  getContractByteCodeHash,
};

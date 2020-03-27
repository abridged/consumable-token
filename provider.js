const HDWalletProvider = require('@truffle/hdwallet-provider');
const PrivateKeyProvider = require('truffle-privatekey-provider');
const { INFURA_ENDPOINT } = require('./constants');

const {
  PROVIDER_MNEMONIC,
  PROVIDER_PRIVATE_KEY,
  PROVIDER_ENDPOINT,
  INFURA_PROJECT_ID,
} = process.env;


function createProvider(network) {
  let providerEndpoint;

  if (PROVIDER_ENDPOINT) {
    providerEndpoint = PROVIDER_ENDPOINT;
  } else if (!INFURA_ENDPOINT[network]) {
    providerEndpoint = 'http://localhost:8545';
  } else if (INFURA_PROJECT_ID) {
    providerEndpoint = `${INFURA_ENDPOINT[network]}${INFURA_PROJECT_ID}`;
  } else {
    throw new Error('Please setup INFURA_PROJECT_ID env variable');
  }

  if (!PROVIDER_MNEMONIC && !PROVIDER_PRIVATE_KEY) {
    throw new Error('Please setup PROVIDER_MNEMONIC or PROVIDER_PRIVATE_KEY env variable');
  }

  return PROVIDER_MNEMONIC
    ? new HDWalletProvider(
      PROVIDER_MNEMONIC,
      providerEndpoint,
      0,
      1,
    )
    : new PrivateKeyProvider(
      PROVIDER_PRIVATE_KEY.startsWith('0x')
        ? PROVIDER_PRIVATE_KEY.substr(2)
        : PROVIDER_PRIVATE_KEY,
      providerEndpoint,
    );
}

module.exports = {
  createProvider,
};

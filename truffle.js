const { NETWORK_IDS } = require('./constants');
const { createProvider } = require('./provider');

module.exports = {
  networks: {
    test: {
      host: '127.0.0.1',
      port: 8555,
      network_id: '*',
    },
    ...Object.keys(NETWORK_IDS)
      .reduce((result, name) => ({
        ...result,
        [name]: {
          provider: () => createProvider(name),
          network_id: NETWORK_IDS[name],
          gas: 6000000,
        },
      }), {}),
  },
  compilers: {
    solc: {
      version: '0.5.12',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: 'istanbul',
      },
    },
  },
  schema: {
    ConsumableToken: {
      addresses: true,
      abi: true,
    },
  },
  plugins: [
    'truffle-plugin-dist',
  ],
};

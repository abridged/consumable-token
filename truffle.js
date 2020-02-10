const HDWalletProvider = require('@truffle/hdwallet-provider');
const { providerMnemonic, providerEndpoint, infuraProjectId } = require('./config');
const { NETWORK_IDS, INFURA_ENDPOINTS } = require('./constants');

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
          provider: () => {
            if (!providerMnemonic) {
              throw new Error('Please setup PROVIDER_MNEMONIC env variable');
            }
            return new HDWalletProvider(
              providerMnemonic,
              INFURA_ENDPOINTS[name] && infuraProjectId
                ? `${INFURA_ENDPOINTS[name]}${infuraProjectId}`
                : providerEndpoint,
              0,
              10,
            );
          },
          network_id: NETWORK_IDS[name],
          gas: 6000000,
        },
      }), {}),
  },
  compilers: {
    solc: {
      version: '0.5.13',
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

const {
  PROVIDER_MNEMONIC,
  PROVIDER_ENDPOINT,
  INFURA_PROJECT_ID,
} = process.env;

module.exports = {
  providerMnemonic: PROVIDER_MNEMONIC || null,
  providerEndpoint: PROVIDER_ENDPOINT || 'http://localhost:8545',
  infuraProjectId: INFURA_PROJECT_ID || null,
};

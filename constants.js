const NETWORK_NAMES = {
  goerli: 'goerli',
  kovan: 'kovan',
  local: 'local',
};

const NETWORK_IDS = {
  [NETWORK_NAMES.goerli]: '5',
  [NETWORK_NAMES.kovan]: '42',
  [NETWORK_NAMES.local]: '4660',
};

const INFURA_ENDPOINT = {
  [NETWORK_NAMES.goerli]: 'https://goerli.infura.io/v3/',
  [NETWORK_NAMES.kovan]: 'https://kovan.infura.io/v3/',
};

module.exports = {
  NETWORK_IDS,
  NETWORK_NAMES,
  INFURA_ENDPOINT,
};

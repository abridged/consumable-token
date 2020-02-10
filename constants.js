const NETWORK_NAMES = {
  main: 'main',
  ropsten: 'ropsten',
  rinkeby: 'rinkeby',
  goerli: 'goerli',
  kovan: 'kovan',
  local: 'local',
};

const NETWORK_IDS = {
  [NETWORK_NAMES.main]: '1',
  [NETWORK_NAMES.ropsten]: '3',
  [NETWORK_NAMES.rinkeby]: '4',
  [NETWORK_NAMES.goerli]: '5',
  [NETWORK_NAMES.kovan]: '42',
  [NETWORK_NAMES.local]: '4660',
};

const INFURA_ENDPOINTS = {
  [NETWORK_NAMES.main]: 'https://mainnet.infura.io/v3/',
  [NETWORK_NAMES.ropsten]: 'https://ropsten.infura.io/v3/',
  [NETWORK_NAMES.rinkeby]: 'https://rinkeby.infura.io/v3/',
  [NETWORK_NAMES.goerli]: 'https://goerli.infura.io/v3/',
  [NETWORK_NAMES.kovan]: 'https://kovan.infura.io/v3/',
};

module.exports = {
  NETWORK_IDS,
  NETWORK_NAMES,
  INFURA_ENDPOINTS,
};

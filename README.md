# Consumable token

[![NPM version][npm-image]][npm-url]
[![MIT licensed][license-image]][license-url]

## Installation

```bash
$ npm i consumable-token -S
```

## Usage

### Javascript

```javascript
import {
  ContractNames,
  getContractAddress,
  getContractAbiDefinition,
} from 'consumable-token';

console.log(
  'ConsumableToken mainnet address:',
  getContractAddress(ContractNames.ConsumableToken),
);
console.log(
  'ConsumableToken kovan address:',
  getContractAddress(ContractNames.ConsumableToken, '42'),
);
console.log(
  'ConsumableToken goerli address:',
  getContractAddress(ContractNames.ConsumableToken, 5),
);
console.log(
  'ConsumableToken abi definition:',
  getContractAbiDefinition(ContractNames.ConsumableToken),
);
```

### Solidity

```Solidity
pragma solidity ^0.5.12;

import {ConsumableToken} from "consumable-token/contracts/token/ConsumableToken.sol";

// ...
```

## Deployed

| network id | network name | contract address |
| --- | --- | --- |
| `5` | Görli | `0x43dE08Bae314B031f9dD333920d2a43b6d229B3E` |
| `42` | Kovan | `0xc2E22B8e4BCE4b89EF5Ac5C648A39e1a2eA59181` |
| `42` | Local | `0xc2E22B8e4BCE4b89EF5Ac5C648A39e1a2eA59181` |

## License

[MIT](./LICENSE)

[npm-image]: https://badge.fury.io/js/consumable-token.svg
[npm-url]: https://npmjs.org/package/consumable-token
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: ./LICENSE


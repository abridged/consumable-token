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
pragma solidity ^0.5.13;

import {ConsumableToken} from "consumable-token/contracts/token/ConsumableToken.sol";

// ...
```

## Deployed

| network | address |
| --- | --- |
| Görli | `0x7A5A7e870e14A42f19A70560a21852C2B8f34082` |

## License

[MIT](./LICENSE)

[npm-image]: https://badge.fury.io/js/consumable-token.svg
[npm-url]: https://npmjs.org/package/consumable-token
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: ./LICENSE


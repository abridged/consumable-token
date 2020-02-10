// updated at: 2020-02-10T12:18:33.371Z

export declare enum ContractNames {
  ConsumableToken = 'ConsumableToken',
}

export declare function getContractAddress(contractName: ContractNames, networkId?: string | number): string;

export declare function getContractAbiDefinition(contractName: ContractNames): any;

export declare function getContractByteCodeHash(contractName: ContractNames): string;

// updated at: 2020-03-27T12:35:23.460Z

export declare enum ContractNames {
  ConsumableToken = 'ConsumableToken',
}

export declare function getContractAddress(contractName: ContractNames, networkId?: string | number): string;

export declare function getContractAbiDefinition(contractName: ContractNames): any;

export declare function getContractByteCodeHash(contractName: ContractNames): string;

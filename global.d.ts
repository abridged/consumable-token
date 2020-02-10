/// <reference types="./node_modules/@types/web3/index.d.ts" />

interface IContractFunction {
  (name: string, fn: (addresses: string[]) => void): any;

  only: (name: string, fn: (addresses: string[]) => void) => any;
  skip: (name: string, fn: (addresses: string[]) => void) => any;
}

declare const contract: IContractFunction;
declare const context: IContractFunction;
declare const web3: Web3;
declare const artifacts: any;

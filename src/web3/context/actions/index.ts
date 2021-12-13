import Web3 from 'web3';
import {tokenType} from '../../../config/Tokens';

interface UpdateAccount {
  type: 'UPDATE_ACCOUNT';
  account: string;
  web3?: Web3;
}

interface UpdateBassets {
  type: 'UPDATE_BASSETS';
  bAssets: tokenType[];
}

interface UpdateChainId {
  type: 'UPDATE_CHAINID';
  chainId: string;
}

export type Action = UpdateAccount | UpdateBassets | UpdateChainId;

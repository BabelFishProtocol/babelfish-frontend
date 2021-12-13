import Web3 from 'web3';
import {offlineTokenList, tokenType} from '../../../config/Tokens';

export interface State {
  account: string;
  web3: Web3 | null;
  bAssets: tokenType[];
  chainId: string | null;
}

export const INITIAL_STATE: State = {
  account: '',
  web3: null,
  bAssets: offlineTokenList,
  chainId: null,
};

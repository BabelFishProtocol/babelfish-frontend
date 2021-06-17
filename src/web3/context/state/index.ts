import Web3 from 'web3';

export interface State {
  account: string;
  web3: Web3 | null;
}

export const INITIAL_STATE: State = {
  account: '',
  web3: null,
};

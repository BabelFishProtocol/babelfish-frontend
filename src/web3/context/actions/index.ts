import Web3 from 'web3';

interface UpdateAcount {
  type: 'UPDATE_ACCOUNT';
  account: string;
  web3?: Web3;
}

export type Action = UpdateAcount;

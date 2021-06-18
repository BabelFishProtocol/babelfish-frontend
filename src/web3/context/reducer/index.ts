import Web3 from 'web3';
import {Action} from '../actions';
import {State, INITIAL_STATE} from '../state';

export const reducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      const web3 = action.web3 || state.web3;
      const {account} = action;
      return {...INITIAL_STATE, account, web3};

    default:
      return state;
  }
};

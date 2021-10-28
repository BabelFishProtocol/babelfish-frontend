import {Action} from '../actions';
import {State, INITIAL_STATE} from '../state';

export const reducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      const web3 = action.web3 || state.web3;
      const {account} = action;
      return {...state, account, web3};
    case 'UPDATE_BASSETS':
      return {...state, bAssets: action.bAssets};
    case 'UPDATE_CHAINID':
      return {...state, chainId: action.chainId};
    default:
      return state;
  }
};

import React, {createContext, useContext, useMemo, useReducer} from 'react';
import {useEffect} from 'react';
import Web3 from 'web3';
import {suscribeAccount} from '../api';
import {reducer} from './reducer';
import {INITIAL_STATE} from './state';

export const Web3Context = createContext({
  state: INITIAL_STATE,
  updateAccount: (_data: {account: string; web3: Web3}) => {},
});

export const useWeb3Context = () => useContext(Web3Context);

interface ProviderProps {}

export const Web3Provider: React.FC<ProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateAccount = (data: {account: string; web3?: Web3}) => {
    dispatch({type: 'UPDATE_ACCOUNT', ...data});
  };

  return (
    <Web3Context.Provider
      value={useMemo(() => ({state, updateAccount}), [state])}>
      {children}
    </Web3Context.Provider>
  );
};

export const Web3Updater = () => {
  const {state} = useWeb3Context();

  useEffect(() => {
    if (state.web3) {
      const ifAccountChanges = suscribeAccount(state.web3, (error, account) => {
        if (error) {
          console.error(error);
        }
        if (account !== undefined && account !== state.account) {
          window.location.reload();
        }
      });
      return ifAccountChanges;
    }
  }, [state.web3, state.account]);

  return null;
};

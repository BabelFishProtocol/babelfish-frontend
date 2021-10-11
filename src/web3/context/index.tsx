import React, {createContext, useContext, useMemo, useReducer} from 'react';
import {useEffect} from 'react';
import Web3 from 'web3';
import {suscribeAccount} from '../api';
import {reducer} from './reducer';
import {INITIAL_STATE} from './state';
import {tokenType} from "../../config/Tokens";

export const Web3Context = createContext({
  state: INITIAL_STATE,
  updateAccount: (_data: {account: string; web3?: Web3}) => {},
  updateBassets: (_data: tokenType[]) => {},
});

export const useWeb3Context = () => useContext(Web3Context);

interface ProviderProps {}

export const Web3Provider: React.FC<ProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateAccount = (data: {account: string; web3?: Web3}) => {
    dispatch({type: 'UPDATE_ACCOUNT', ...data});
  };
  const updateBassets = (bAssets: tokenType[]) => {
    dispatch({type: 'UPDATE_BASSETS', bAssets});
  };

  return (
    <Web3Context.Provider
      value={useMemo(() => ({state, updateAccount, updateBassets}), [state])}>
      {children}
    </Web3Context.Provider>
  );
};

export const Web3Updater = () => {
  const {state, updateAccount} = useWeb3Context();

  useEffect(() => {
    if (state.web3) {
      const ifAccountChanges = suscribeAccount(state.web3, (error, account) => {
        if (error) {
          console.error(error);
        }
        if (
          account !== undefined &&
          account !== null &&
          account !== state.account
        ) {
          updateAccount({account});
        }
      });
      return ifAccountChanges;
    }
  }, [state.web3, state.account]);

  return null;
};

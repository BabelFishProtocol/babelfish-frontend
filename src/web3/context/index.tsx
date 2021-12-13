import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { useEffect } from 'react';
import Web3 from 'web3';
import { reducer } from './reducer';
import { INITIAL_STATE } from './state';
import { tokenType } from "../../config/Tokens";

export const Web3Context = createContext({
  state: INITIAL_STATE,
  updateAccount: (_data: { account: string; web3?: Web3 }) => { },
  updateChainId: (_data: string) => { },
  updateBassets: (_data: tokenType[]) => { },
});

export const useWeb3Context = () => useContext(Web3Context);

interface ProviderProps { }

export const Web3Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateAccount = (data: { account: string; web3?: Web3 }) => {
    dispatch({ type: 'UPDATE_ACCOUNT', ...data });
  };
  const updateBassets = (bAssets: tokenType[]) => {
    dispatch({ type: 'UPDATE_BASSETS', bAssets });
  };
  const updateChainId = (chainId: string) => {
    dispatch({ type: 'UPDATE_CHAINID', chainId });
  };

  return (
    <Web3Context.Provider
      value={useMemo(() => ({ state, updateAccount, updateBassets, updateChainId }), [state])}>
      {children}
    </Web3Context.Provider>
  );
};

export const Web3Updater = () => {
  const { state, updateAccount, updateChainId } = useWeb3Context();
  if (state.web3) {
    const ethereum = (window as any)?.ethereum;

    ethereum.on('accountsChanged', function (accounts: string[]) {
      updateAccount({ account: accounts[0] });
    });

    ethereum.on('networkChanged', updateChainId);
  };

  return null;
};

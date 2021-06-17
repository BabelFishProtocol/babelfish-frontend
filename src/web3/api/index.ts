import Web3 from 'web3';
import Portis from '@portis/web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {walletEnum} from '../../config/Wallets';

export const connectMetamask = async () => {
  const {ethereum} = window as any;
  if (Boolean(ethereum && ethereum.isMetaMask)) {
    const web3 = new Web3(ethereum as any);
    const accounts = await web3.eth.requestAccounts();
    return {web3, account: accounts[0] || ''};
  } else {
    throw new Error(
      '🦊 You must install Metamask into your browser: https://metamask.io/download.html',
    );
  }
};

export const connectPortis = async () => {
  const portis = new Portis('d5bd0255-e892-439b-b43c-92b83dfe2be1', 'mainnet');
  const web3 = new Web3(portis.provider);
  const accounts = await web3.eth.getAccounts();
  return {web3, account: accounts[0] || ''};
};

export const connectWallet = async (wallet: walletEnum) => {
  switch (wallet) {
    case 'Metamask':
      return await connectMetamask();
    case 'Portis':
      return await connectPortis();
  }
};

export const suscribeAccount = (
  web3: Web3,
  callback: (error: Error | null, account: string | null) => any,
) => {
  const loop = setInterval(async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      callback(null, accounts[0]);
    } catch (error) {
      callback(error, null);
    }
  }, 1000);

  return () => {
    clearInterval(loop);
  };
};

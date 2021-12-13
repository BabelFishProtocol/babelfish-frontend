import Web3 from 'web3';
import Portis from '@portis/web3';
import {walletEnum} from '../../config/Wallets';
const {ethereum} = window as any;
const portis = new Portis('d5bd0255-e892-439b-b43c-92b83dfe2be1', 'mainnet');

export const connectWallet = async (wallet: walletEnum) => {
  switch (wallet) {
    case 'Metamask':
      return await connectMetamask();
    case 'Portis':
      return await connectPortis();
    case 'Liquality':
      return await connectLiquality();
    case 'Nifty':
      return await connectNifty();
    default:
      throw new Error('unknown wallet. cant happen');
  }
};

export const disconnectWallet = async (web3: any) => {
  window.location.reload();
};

export const connectMetamask = async () => {
  if (Boolean(ethereum && ethereum.isMetaMask)) {
    const web3 = new Web3(ethereum as any);
    const accounts = await web3.eth.requestAccounts();
    const chainId = await (await web3.eth.getChainId()).toString();
    console.log(chainId)
    return {web3, account: accounts[0] || '', chainId};
  } else {
    throw new Error(
      '🦊 You must install Metamask into your browser: https://metamask.io/download.html and make sure it is set as the default wallet.',
    );
  }
};

export const connectPortis = async () => {
  const web3 = new Web3(portis.provider);
  const accounts = await web3.eth.getAccounts();
  const chainId = await web3.eth.getChainId().toString();
  return {web3, account: accounts[0] || '', chainId};
};

export const connectLiquality = async () => {
  if (ethereum.isLiquality) {
    const web3 = new Web3(ethereum as any);
    await ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId().toString();
    return {web3, account: accounts[0] || '', chainId};
  } else {
    throw new Error(
      '🔵🟣 You must install Liquality into your browser: https://liquality.io/wallet.html and make sure it is set as the default wallet.',
    );
  }
};

export const connectNifty = async () => {
  if (ethereum.isNiftyWallet) {
    const web3 = new Web3(ethereum as any);
    await ethereum.enable();
    let accounts = await web3.eth.getAccounts();
    accounts = await web3.eth.requestAccounts();
    const chainId = await web3.eth.getChainId().toString();
    return {web3, account: accounts[0] || '', chainId};
  } else {
    throw new Error(
      '👛 You must install Nifty into your browser: https://bit.ly/3k1lBqP and make sure it is set as the default wallet.',
    );
  }
};

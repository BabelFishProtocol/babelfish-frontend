import React, {useState} from 'react';
import {ButtonPrimary} from '../../lib/components';
import {wallets, walletType} from '../../config/Wallets';
import {
  ConnectedButton,
  ConnectWalletContainer,
  Icon,
  Info,
  WalletContainer,
  WalletIcon,
  WalletsListContainer,
} from './styles';
import Web3 from 'web3';
declare let window: any;

export const WalletConnect = () => {
  interface IConnectedProps {
    wallet: walletType | undefined;
  }
  const [displayList, setDisplayList] = useState(false);
  const [connected, setConnected] = useState<IConnectedProps>();
  const {ethereum} = window;

  const getWeb3 = () => {
    return new Promise((resolve, reject) => {
      if (Boolean(ethereum && ethereum.isMetaMask)) {
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          window.ethereum
            .request({method: 'eth_requestAccounts'})
            .then(() => resolve(web3));
        } catch (error) {
          reject(error);
        }
      } else {
        reject(
          '🦊 You must install Metamask into your browser: https://metamask.io/download.html',
        );
      }
    });
  };

  const walletConnect = async () => {
    const web3: any = await getWeb3();
    const accounts = await web3?.eth.getAccounts();
    console.log(accounts);
  };
  return (
    <ConnectWalletContainer>
      {connected?.wallet ? (
        <ConnectedButton>
          03XAS42135Q…
          <Icon src={connected.wallet.icon} />
        </ConnectedButton>
      ) : (
        <ButtonPrimary
          className="position-relative"
          onClick={() => setDisplayList(!displayList)}>
          Connect Wallet
        </ButtonPrimary>
      )}
      <WalletsListContainer
        className={`${!(displayList && !connected) && 'd-none'}`}>
        {wallets.map((wallet) => (
          <WalletContainer onClick={() => walletConnect()} key={wallet.id}>
            {wallet.name}
            <WalletIcon src={wallet.icon} />
          </WalletContainer>
        ))}
        {/* <Info>
            <span>What is a wallet?</span>
          </Info> */}
      </WalletsListContainer>
    </ConnectWalletContainer>
  );
};

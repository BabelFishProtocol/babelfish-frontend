import React, {useState} from 'react';
import {ButtonPrimary} from '../../lib/components';
import {wallets, walletType} from '../../config/Wallets';

import {
  ConnectedButton,
  ConnectWalletContainer,
  Icon,
  WalletContainer,
  WalletIcon,
  WalletPopUp,
} from './styles';
import {connectWallet, suscribeAccount} from '../../web3/api';
import {useWeb3Context} from '../../web3/context';
import Web3 from 'web3';

export const WalletConnect = () => {
  const {
    state: {account},
    updateAccount,
  } = useWeb3Context();

  interface IConnectedProps {
    wallet: walletType;
  }
  const [displayList, setDisplayList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState<IConnectedProps>();
  return (
    <ConnectWalletContainer>
      {connected?.wallet ? (
        <ConnectedButton onClick={() => setDisplayList(!displayList)}>
          {account}
          <Icon src={connected.wallet.icon} />
        </ConnectedButton>
      ) : (
        <ButtonPrimary
          className="position-relative"
          onClick={() => setDisplayList(!displayList)}>
          CONNECT WALLET
        </ButtonPrimary>
      )}
      <WalletPopUp className={`${!displayList && 'd-none'}`}>
        {loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {wallets.map((wallet) => (
          <WalletContainer
            className={`${loading && 'd-none'}`}
            connected={connected?.wallet?.id === wallet.id}
            onClick={() => {
              setLoading(true);
              connectWallet(wallet.id)
                ?.then(
                  (data: any) => {
                    setConnected({wallet: wallet});
                    updateAccount(data);
                    setLoading(false);
                  },
                  (error) => {
                    console.error(error.message);
                    setLoading(false);
                  },
                )
                .catch(() => console.log('error'));
            }}
            key={wallet.id}>
            {wallet.name}
            <WalletIcon src={wallet.icon} />
          </WalletContainer>
        ))}
      </WalletPopUp>
    </ConnectWalletContainer>
  );
};

import React, {useState} from 'react';
import {ButtonPrimary} from '../../lib/components';
import {wallets, walletType} from '../../config/Wallets';
// @ts-ignore
import useOnClickOutside from 'use-onclickoutside';

import {
  ConnectedButton,
  ConnectWalletContainer,
  Disconnect,
  Icon,
  WalletContainer,
  WalletIcon,
  WalletPopUp,
} from './styles';
import {connectWallet, disconnectWallet} from '../../web3/api';
import {useWeb3Context} from '../../web3/context';
import Web3 from 'web3';

export const WalletConnect = () => {
  const {
    state: {account, web3},
    updateAccount,
  } = useWeb3Context();

  interface IConnectedProps {
    wallet: walletType;
  }
  const [displayList, setDisplayList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState<IConnectedProps>();
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => displayList && setDisplayList(false));
  return (
    <ConnectWalletContainer>
      {connected?.wallet ? (
        <ConnectedButton onClick={() => setDisplayList(!displayList)}>
          {`${account?.slice(0, 4)}...${account?.slice(-4, account?.length)}`}
          <Icon src={connected.wallet.icon} />
          <Disconnect />
        </ConnectedButton>
      ) : (
        <ButtonPrimary
          className="position-relative"
          onClick={() => setDisplayList(!displayList)}>
          CONNECT WALLET
        </ButtonPrimary>
      )}
      <WalletPopUp ref={ref} className={`${!displayList && 'd-none'}`}>
        {loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {wallets.map((wallet) => (
          <>
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
                      alert(error.message);
                      setLoading(false);
                    },
                  )
                  .catch(() => console.log('error'));
              }}
              key={wallet.id}>
              {wallet.name}
              <WalletIcon src={wallet.icon} />
            </WalletContainer>
          </>
        ))}
        {connected?.wallet && !loading && (
          <ButtonPrimary
            onClick={() => disconnectWallet(web3)}
            className="w-100">
            Disconnect
          </ButtonPrimary>
        )}
      </WalletPopUp>
    </ConnectWalletContainer>
  );
};

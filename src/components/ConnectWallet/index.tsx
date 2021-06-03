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

export const WalletConnect = () => {
  interface IConnectedProps {
    wallet: walletType | undefined;
  }
  const [displayList, setDisplayList] = useState(false);
  const [connected, setConnected] = useState<IConnectedProps>();
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
      {displayList && !connected && (
        <WalletsListContainer>
          {wallets.map((wallet) => (
            <WalletContainer
              onClick={() => setConnected({wallet: wallet})}
              key={wallet.id}>
              {wallet.name}
              <WalletIcon src={wallet.icon} />
            </WalletContainer>
          ))}
          <Info>
            <span>What is a wallet?</span>
          </Info>
        </WalletsListContainer>
      )}
    </ConnectWalletContainer>
  );
};

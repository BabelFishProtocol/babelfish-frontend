import React, {useState} from 'react';
import {ButtonPrimary} from '../../lib/components';
import {wallets, walletType} from '../../config/Wallets';
import {ReactComponent as LogoutLogo} from '../../resources/svgs/log-out.svg';
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
import {listBassets} from "../../web3/service";
import {
  baseTokenCatalog,
  destinationTokenEnum,
  destinationTokensCatalog,
  joinWithAddressList
} from "../../config/Tokens";

export const WalletConnect = () => {
  const {
    state: {account, web3},
    updateAccount,
    updateBassets,
    updateChainId,
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
        <ConnectedButton>
          {`${account?.slice(0, 4)} ... ${account?.slice(-4, account?.length)}`}
          {/* <Icon src={connected.wallet.icon} /> */}
          <Disconnect onClick={() => disconnectWallet(web3)}>
            <LogoutLogo />
          </Disconnect>
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
          <WalletContainer
            className={`${loading && 'd-none'}`}
            connected={connected?.wallet?.id === wallet.id}
            onClick={() => {
              setLoading(true);
              connectWallet(wallet.id)
                .then(
                  (data) => {
                    if (!data) {
                      return;
                    }
                    // (async () => {
                    //   const tokenList = {};
                    //   for (let [destinationTokenId] of Object.entries(destinationTokensCatalog)) {
                    //     Object.assign(tokenList, await listBassets(data.web3, destinationTokenId as destinationTokenEnum));
                    //   }
                    //   return tokenList;
                    // })().then(
                    //   (tokenList) => {
                    //     console.log('tokenList', tokenList);
                    //     updateBassets(joinWithAddressList(baseTokenCatalog, tokenList));
                    //   }
                    // );
                    // (window as any)?.ethereum?.on('accountsChanged', function (accounts: any) {
                    //   console.log('accounts', accounts);
                    // })
                    updateAccount(data);
                    setDisplayList(false);
                    setConnected({wallet: wallet});
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
        ))}
        {/* {connected?.wallet && !loading && (
          <ButtonPrimary
            onClick={() => disconnectWallet(web3)}
            className="w-100">
            Disconnect
          </ButtonPrimary>
        )} */}
      </WalletPopUp>
    </ConnectWalletContainer>
  );
};

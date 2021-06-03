import React from 'react';
import {WalletConnect} from '../ConnectWallet';
import {HeaderContainer, HeaderTitle} from './styles';
import {useHistory} from 'react-router-dom';

export const Header = () => {
  const history = useHistory();
  return (
    <HeaderContainer className="p-4">
      <HeaderTitle onClick={() => history.push('/dashboard')}>
        BabelFish.Money
      </HeaderTitle>
      <WalletConnect />
    </HeaderContainer>
  );
};

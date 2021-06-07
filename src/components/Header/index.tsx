import React from 'react';
import {WalletConnect} from '../ConnectWallet';
import {HeaderContainer, HeaderTitle} from './styles';
import {useHistory} from 'react-router-dom';

export const Header = () => {
  const history = useHistory();
  return (
    <HeaderContainer className="px-4">
      <HeaderTitle onClick={() => history.push('/landing')}>
        BabelFish.Money
      </HeaderTitle>
      <WalletConnect />
    </HeaderContainer>
  );
};

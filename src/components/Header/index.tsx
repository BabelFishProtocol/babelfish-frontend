import React from 'react';
import {WalletConnect} from '../ConnectWallet';
import {HeaderContainer, HeaderTitle} from './styles';
import {useHistory} from 'react-router-dom';
import {ButtonSecondary} from '../../lib/components';
import logo from '../../resources/svgs/logo-small.svg';

export const Header = () => {
  const history = useHistory();
  return (
    <HeaderContainer className="px-4">
      <HeaderTitle onClick={() => history.push('/dashboard')}>
        <img height="25px" src={logo} />
        &nbsp;BabelFish.Money
      </HeaderTitle>
      <div className="d-flex">
        <ButtonSecondary onClick={() =>  window.location.href = 'https://governance-babelfish.netlify.app/'}>
          GO TO GOVERNANCE
        </ButtonSecondary>
        <WalletConnect />
      </div>
    </HeaderContainer>
  );
};

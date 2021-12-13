import React from 'react';
import {WalletConnect} from '../ConnectWallet';
import {HeaderContainer, HeaderTitle} from './styles';
import {useHistory} from 'react-router-dom';
import logo from '../../resources/svgs/logo-small.svg';
import {LinkSecondary} from '../../lib/components/Button/styles';

export const Header = () => {
  const history = useHistory();
  return (
    <HeaderContainer className="px-4">
      <HeaderTitle
        onClick={() =>
          history.push(`${process.env.REACT_APP_BASE_PATH}/dashboard`)
        }
      >
        <img height="25px" src={logo} alt="logo" />
        &nbsp;BabelFish.Money
      </HeaderTitle>
      <div className="d-flex">
        <LinkSecondary href={process.env.REACT_APP_GOVERNANCE_SITE}>
          GO TO GOVERNANCE
        </LinkSecondary>
        <WalletConnect />
      </div>
    </HeaderContainer>
  );
};

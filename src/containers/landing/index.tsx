import React from 'react';
import {ButtonPrimary, ButtonSecondary} from '../../lib/components';
import {LandingContainer, Logo, Subtitle} from './styled';
import logo from '../../resources/svgs/logo.svg';
import {useHistory} from 'react-router-dom';

export const Landing = () => {
  const history = useHistory();
  return (
    <LandingContainer>
      <Logo src={logo} />
      <Subtitle className="mt-4">
        "BabelFish's mind-boggling objective is to enhance USD-stablecoin flow
        and accelerate hyperBitcoinization.
      </Subtitle>
      <div className="row w-100 px-5 mt-4">
        <div className="col-6">
          <ButtonPrimary
            className="w-100"
            onClick={() => history.push(`${process.env.REACT_APP_BASE_PATH}/deposit`)}>
            Deposit
          </ButtonPrimary>
        </div>
        <div className="col-6">
          <ButtonSecondary
            className="w-100"
            onClick={() => history.push(`${process.env.REACT_APP_BASE_PATH}/redeem`)}>
            Redeem
          </ButtonSecondary>
        </div>
      </div>
    </LandingContainer>
  );
};

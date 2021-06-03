import React from 'react';
import {CoinContainer, CoinIcon} from './styles';
import {tokens, tokenType} from '../../config/Tokens';

export const CoinsDeposited = () => {
  return (
    <>
      {tokens.map((token: tokenType) => (
        <CoinContainer key={token.id}>
          <CoinIcon src={token.icon} /> 10,000.00
        </CoinContainer>
      ))}
    </>
  );
};

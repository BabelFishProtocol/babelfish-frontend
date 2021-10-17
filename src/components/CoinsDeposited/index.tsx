import React from 'react';
import {CoinContainer, CoinIcon} from './styles';
import {useWeb3Context} from "../../web3/context";

export const CoinsDeposited = () => {
  const {
    state: {bAssets},
  } = useWeb3Context();
  return (
    <>
      {bAssets.map((token) => (
        <CoinContainer key={token.name}>
          <CoinIcon src={token.icon} /> 10,000.00
        </CoinContainer>
      ))}
    </>
  );
};

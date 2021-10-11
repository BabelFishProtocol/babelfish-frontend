import React from 'react';
import {ProgressBar} from '../../lib/components/ProgressBar';
import {BarContainer, Icon, Label} from './styles';
import {tokenEnum, tokens, tokenType} from '../../config/Tokens';

interface ITokenBarProps {
  name: string;
  icon: string;
  value: number;
  totalValue: number;
}

export const TokenBar = ({name, icon, value, totalValue}: ITokenBarProps) => {
  return (
    <div className="d-flex py-2 w-100">
      <Icon src={icon} />
      <BarContainer>
        <Label className="mb-1">{name}</Label>
        <ProgressBar value={value} totalValue={totalValue} />
      </BarContainer>
    </div>
  );
};

interface IAllTokensBarProps {
  balances?: {value: number; totalValue: number; address: string}[];
}

export const AllTokensBar = ({balances = []}: IAllTokensBarProps) => {
  return (
    <div>
      {tokens.map((token) => {
        const foundToken = balances.find((balance) => balance.address === token.address);
        return (
          <TokenBar
            key={token.address}
            name={token.name || token.symbol}
            icon={token.icon || `https://via.placeholder.com/150?text=${token.symbol}`}
            value={foundToken?.value || 0}
            totalValue={foundToken?.totalValue || 1}
          />
        );
      })}
    </div>
  );
};

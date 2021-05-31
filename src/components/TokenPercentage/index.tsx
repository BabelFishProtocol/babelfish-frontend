import React from "react";
import { ProgressBar } from "../../lib/components/ProgressBar";
import { BarContainer, Icon, Label } from "./styles";
import { tokenEnum, tokens } from "../../config/Tokens";

interface ITokenBarProps {
  name: string;
  icon: string;
  value: number;
  totalValue: number;
}

export const TokenBar = ({ name, icon, value, totalValue }: ITokenBarProps) => {
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
  balances?: { value: number; totalValue: number; id: tokenEnum }[];
}

export const AllTokensBar = ({ balances = [] }: IAllTokensBarProps) => {
  return (
    <div>
      {tokens.map((token) => {
        const foundToken = balances.find((balance) => balance.id === token.id);
        return (
          <TokenBar
            key={token.id}
            name={token.name}
            icon={token.icon}
            value={foundToken?.value || 0}
            totalValue={foundToken?.totalValue || 1}
          />
        );
      })}
    </div>
  );
};

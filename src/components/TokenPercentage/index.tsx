import React from "react";
import { ProgressBar } from "../../lib/components/ProgressBar";
import { BarContainer, Icon, Label } from "./styles";
import { tokensArray } from "../../config/Tokens";

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
        <ProgressBar value={50} totalValue={100} />
      </BarContainer>
    </div>
  );
};

export const AllTokensBar = () => {
  return (
    <div>
      {tokensArray.map((token, index) => {
        return (
          <TokenBar
            key={token.name}
            name={token.name}
            icon={token.icon}
            value={0}
            totalValue={100}
          />
        );
      })}
    </div>
  );
};

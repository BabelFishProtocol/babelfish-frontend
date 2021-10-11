import React from 'react';
import {
  ChainGroupContainer,
  ChainIcon,
  ChainName,
  SelectChainContainer,
} from './styles';
import {chains, chainEnum, chainType} from '../../config/Chains';

interface IChainProps {
  name: string;
  icon: string;
  onClick: any;
}

export const ChainButton = ({name, icon, onClick}: IChainProps) => {
  return (
    <SelectChainContainer onClick={onClick}>
      <ChainIcon src={icon} />
      <ChainName>{name}</ChainName>
    </SelectChainContainer>
  );
};

interface IChainGroupProps {
  onClick: (ch: chainEnum) => void;
}

export const ChainGroup = ({onClick}: IChainGroupProps) => {
  return (
    <ChainGroupContainer>
      {chains.map((chain: chainType) => {
        return (
          <ChainButton
            onClick={() => onClick(chain.id)}
            key={chain.id}
            icon={chain.icon}
            name={chain.name}
          />
        );
      })}
    </ChainGroupContainer>
  );
};

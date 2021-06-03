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
}

export const ChainButton = ({name, icon}: IChainProps) => {
  return (
    <SelectChainContainer>
      <ChainIcon src={icon} />
      <ChainName>{name}</ChainName>
    </SelectChainContainer>
  );
};

interface IChainGroupProps {}

export const ChainGroup = ({}: IChainGroupProps) => {
  return (
    <ChainGroupContainer>
      {chains.map((chain: chainType) => {
        return (
          <ChainButton key={chain.id} icon={chain.icon} name={chain.name} />
        );
      })}
    </ChainGroupContainer>
  );
};

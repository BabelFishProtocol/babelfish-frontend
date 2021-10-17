import React, {useEffect, useState} from 'react';
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
  onChange: (ch: chainEnum) => void;
}

async function addNetworks() {
  const networkData = chains.filter(({chainId}) => !['0x3'].includes(chainId)).map(
    ({name, chainId, rpcUrls, nativeCurrency, blockExplorerUrls}) => ({
      chainId,
      chainName: name,
      rpcUrls,
      nativeCurrency,
      blockExplorerUrls,
    })
  );
  await (window as any).ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });
}

export const ChainGroup = ({onChange}: IChainGroupProps) => {
  // const [valueClicked, setClicked] = useState<chainType | undefined>(undefined);
  // useEffect(
  //   () => {
  //     if (valueClicked && (window as any).ethereum) {
  //       addNetworks().then(
  //         () => {
  //           (window as any).ethereum.request({ method: 'wallet_switchEthereumChain', params: [{chainId: valueClicked.chainId}]}).then(
  //             () => {
  //               onChange(valueClicked.id);
  //             },
  //             () => {},
  //           ).then(
  //             () => {
  //               setClicked(undefined);
  //             },
  //           );
  //         }
  //       );
  //     }
  //   },
  //   [valueClicked],
  // );
  return (
    <ChainGroupContainer>
      {chains.map((chain: chainType) => {
        return (
          <ChainButton
            onClick={
              () => {
                // setClicked(chain);
                onChange(chain.id);
              }
            }
            key={chain.id}
            icon={chain.icon}
            name={chain.name}
          />
        );
      })}
    </ChainGroupContainer>
  );
};

import React, {useEffect, useState} from 'react';
import {
  ChainGroupContainer,
  ChainIcon,
  ChainName,
  SelectChainContainer,
} from './styles';
import {chains, chainEnum, chainType} from '../../config/Chains';
import {useWeb3Context} from '../../web3/context';

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

async function addNetwork(
  ethereumProvider: any,
  {chainId, name, rpcUrls, nativeCurrency, blockExplorerUrls}: chainType,
) {
  if (['0x3', '0x1'].includes(chainId)) {
    return;
  }
  await ethereumProvider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId,
        chainName: name,
        rpcUrls,
        nativeCurrency,
        blockExplorerUrls,
      },
    ],
  });
}

async function switchNetwork(ethereumProvider: any, chainId: string) {
  return ethereumProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{chainId}],
  });
}

export const ChainGroup = ({onChange}: IChainGroupProps) => {
  const {
    state: {
      // chainId,
      web3,
    },
  } = useWeb3Context();
  const [valueClicked, setClicked] = useState<chainType | undefined>(undefined);
  useEffect(() => {
    if (valueClicked && web3) {
      web3.eth.getChainId().then((chainId) => {
        if (chainId) {
          if (chainId === parseInt(valueClicked.chainId, 16)) {
            setClicked(undefined);
            onChange(valueClicked.id);
            return;
          }
          const ethereumP = (window as any).ethereum;
          const currentProvider = web3?.currentProvider as any;
          if (currentProvider?.isMetaMask && ethereumP) {
            addNetwork(ethereumP, valueClicked).then(() => {
              switchNetwork(ethereumP, valueClicked.chainId)
                .then(
                  () => {
                    onChange(valueClicked.id);
                  },
                  () => {},
                )
                .then(() => {
                  setClicked(undefined);
                });
            });
          }
        }
      });
    }
  }, [
    valueClicked,
    web3,
    // chainId,
  ]);
  return (
    <ChainGroupContainer>
      {chains.map((chain: chainType) => {
        return (
          <ChainButton
            onClick={() => {
              setClicked(chain);
            }}
            key={chain.id}
            icon={chain.icon}
            name={chain.name}
          />
        );
      })}
    </ChainGroupContainer>
  );
};

export const ChainGroupNoSwitch = ({onChange}: IChainGroupProps) => {
  return (
    <ChainGroupContainer>
      {chains.map((chain: chainType) => {
        return (
          <ChainButton
            onClick={() => {
              onChange(chain.id);
            }}
            key={chain.id}
            icon={chain.icon}
            name={chain.name}
          />
        );
      })}
    </ChainGroupContainer>
  );
};

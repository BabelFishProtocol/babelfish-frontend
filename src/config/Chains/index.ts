import ethIcon from '../../resources/images/Chains/ETH/logo.png';
import bscIcon from '../../resources/images/Chains/BSC/logo.png';
import rskIcon from '../../resources/images/Chains/RSK/logo.png';

const IS_MAINNET = process.env.REACT_APP_PRODUCTION_CHAINS === 'TRUE';

export enum chainEnum {
  ETH = 'ETH',
  BSC = 'BSC',
  RSK = 'RSK',
}

export type chainType = {
  name: string;
  id: chainEnum;
  icon: string;
  chainId: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
};

export const chains: chainType[] = [
  {
    name: 'ETH Network',
    id: chainEnum.ETH,
    icon: ethIcon,
    chainId: '0x' + Number(IS_MAINNET ? 1 : 3).toString(16),
    rpcUrls: [
      IS_MAINNET
        ? 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
        : 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ],
    nativeCurrency: {
      name: gasAsset(chainEnum.ETH),
      symbol: gasAsset(chainEnum.ETH),
      decimals: 18,
    },
    blockExplorerUrls: [chainExplorer(chainEnum.ETH)],
  },
  {
    name: 'BSC Network',
    id: chainEnum.BSC,
    icon: bscIcon,
    chainId: '0x' + Number(IS_MAINNET ? 56 : 97).toString(16),
    rpcUrls: [
      IS_MAINNET
        ? 'https://bsc-dataseed.binance.org'
        : 'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    nativeCurrency: {
      name: gasAsset(chainEnum.BSC),
      symbol: gasAsset(chainEnum.BSC),
      decimals: 18,
    },
    blockExplorerUrls: [chainExplorer(chainEnum.BSC)],
  },
  {
    name: 'RSK Network',
    id: chainEnum.RSK,
    icon: rskIcon,
    chainId: '0x' + Number(IS_MAINNET ? 30 : 31).toString(16),
    rpcUrls: [
      IS_MAINNET
        ? 'https://public-node.rsk.co'
        : 'https://testnet.sovryn.app/rpc',
    ],
    nativeCurrency: {
      name: gasAsset(chainEnum.RSK),
      symbol: gasAsset(chainEnum.RSK),
      decimals: 18,
    },
    blockExplorerUrls: [chainExplorer(chainEnum.RSK)],
  },
] as chainType[];

export function chainExplorer(network: chainEnum): string {
  if (network === chainEnum.RSK) {
    return `https://${
      IS_MAINNET ? 'explorer.rsk.co' : 'explorer.testnet.rsk.co'
    }`;
  }
  if (network === chainEnum.BSC) {
    return `https://${IS_MAINNET ? 'bscscan.com' : 'testnet.bscscan.com'}`;
  }
  return `https://${IS_MAINNET ? 'etherscan.io' : 'ropsten.etherscan.io'}`;
}

export function trxExplorerLink(network: chainEnum, hash: string): string {
  if (network === chainEnum.RSK) {
    return `${chainExplorer(network)}/tx/${hash}`;
  }
  if (network === chainEnum.BSC) {
    return `${chainExplorer(network)}/tx/${hash}`;
  }
  return `${chainExplorer(network)}/tx/${hash}`;
}

export function gasAsset(network: chainEnum): string {
  if (network === chainEnum.RSK) {
    return 'RBTC';
  }
  if (network === chainEnum.BSC) {
    return 'BNB';
  }
  return 'ETH';
}

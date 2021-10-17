import ethIcon from '../../resources/images/Chains/ETH/logo.png';
import bscIcon from '../../resources/images/Chains/BSC/logo.png';
import rskIcon from '../../resources/images/Chains/RSK/logo.png';

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
  rpcUrls: string[],
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
};

export const chains = [
  {
    name: 'ETH Network',
    id: chainEnum.ETH,
    icon: ethIcon,
    chainId: '0x' + Number(3).toString(16),
    rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ropsten.etherscan.io'],
  },
  {
    name: 'BSC Network',
    id: chainEnum.BSC,
    icon: bscIcon,
    chainId: '0x' + Number(97).toString(16),
    rpcUrls: ['https://data-seed-prebsc-2-s3.binance.org:8545'],
    nativeCurrency: {
      name: 't-BNB',
      symbol: 't-BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  {
    name: 'RSK Network',
    id: chainEnum.RSK,
    icon: rskIcon,
    chainId: '0x' + Number(31).toString(16),
    rpcUrls: ['https://testnet.sovryn.app/rpc'],
    nativeCurrency: {
      name: 'tRBTC',
      symbol: 'tRBTC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
  },
] as chainType[];

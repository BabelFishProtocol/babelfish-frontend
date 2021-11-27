import ethIcon from '../../resources/images/Chains/ETH/logo.png';
import bscIcon from '../../resources/images/Chains/BSC/logo.png';
import rskIcon from '../../resources/images/Chains/RSK/logo.png';

const IS_MAINNET = process.env.REACT_APP_CHAIN_ID === '30';

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
    chainId: '0x' + Number(IS_MAINNET ? 1 : 3).toString(16),
    rpcUrls: [IS_MAINNET ? 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' : 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [IS_MAINNET ? 'https://etherscan.io' : 'https://ropsten.etherscan.io'],
  },
  {
    name: 'BSC Network',
    id: chainEnum.BSC,
    icon: bscIcon,
    chainId: '0x' + Number(IS_MAINNET ? 56 : 97).toString(16),
    rpcUrls: [IS_MAINNET ? 'https://bsc-dataseed.binance.org' : 'https://data-seed-prebsc-2-s3.binance.org:8545'],
    nativeCurrency: {
      name: 't-BNB',
      symbol: 't-BNB',
      decimals: 18,
    },
    blockExplorerUrls: [IS_MAINNET ? 'https://bscscan.com' : 'https://testnet.bscscan.com'],
  },
  {
    name: 'RSK Network',
    id: chainEnum.RSK,
    icon: rskIcon,
    chainId: '0x' + Number(IS_MAINNET ? 30 : 31).toString(16),
    rpcUrls: ['https://testnet.sovryn.app/rpc'],
    nativeCurrency: {
      name: 'tRBTC',
      symbol: 'tRBTC',
      decimals: 18,
    },
    blockExplorerUrls: [IS_MAINNET ? 'https://explorer.rsk.co' : 'https://explorer.testnet.rsk.co'],
  },
] as chainType[];

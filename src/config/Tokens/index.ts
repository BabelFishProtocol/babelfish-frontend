import usdtIcon from '../../resources/images/Tokens/Usdt/usdt.png';
import bnbIcon from '../../resources/images/Tokens/Bnb/bnb.svg';
import ethIcon from '../../resources/images/Tokens/Eth/eth2.svg';
import daiIcon from '../../resources/images/Tokens/Dai/dai.png';
import usdcIcon from '../../resources/images/Tokens/Usdc/usdc.png';
import busdIcon from '../../resources/images/Tokens/Busd/busd.png';
import docIcon from '../../resources/images/Tokens/Doc/doc.svg';
import rdocIcon from '../../resources/images/Tokens/Rdoc/rdoc.svg';
import {chainEnum} from '../Chains';
import ERC20ABI from "../../web3/abi/ERC20.json";

// const IS_TESTNET = process.env.REACT_APP_CHAIN_ID === '31';
const IS_LOCALNET = process.env.REACT_APP_CHAIN_ID !== '31';

export enum tokenEnum {
  USDT = 'USDT',
  USDC = 'USDC',
  BUSD = 'BUSD',
  DAI = 'DAI',
  DOC = 'DOC',
  RDOC = 'RDOC',
  ETH = 'ETH',
  BNB = 'BNB',
  DUMMY1 = 'DUMMY1',
  DUMMY2 = 'DUMMY2',
  DUMMY3 = 'DUMMY3',
}

export enum destinationTokenEnum {
  XUSD = 'XUSD',
  ETHs = 'ETHs',
  BNBs = 'BNBs',
}

export type tokenOnNetworkType = {
  symbol: string;
  address: string;
}

export type tokenTypeBase = {
  id: tokenEnum;
  name: string;
  icon?: string;
  networks: {
    [chainEnum.RSK]: string | null;
    [chainEnum.BSC]: string | null;
    [chainEnum.ETH]: string | null;
  };
  bridgedTo: {
    id: destinationTokenEnum;
    symbol: string;
    address: string;
  };
};

export type tokenType = {
  id: tokenEnum;
  name: string;
  icon?: string;
  networks: {
    [chainEnum.RSK]: tokenOnNetworkType | null;
    [chainEnum.BSC]: tokenOnNetworkType | null;
    [chainEnum.ETH]: tokenOnNetworkType | null;
  };
  bridgedTo: {
    id: destinationTokenEnum;
    symbol: string;
    address: string;
  };
};

export const destinationTokensCatalog = {
  [destinationTokenEnum.XUSD]: {
    symbol: 'XUSD',
    address: IS_LOCALNET ? '0x0290FB167208Af455bB137780163b7B7a9a10C16' : '0x152123ec3D9fe2Cf57aBc09917C1ba51324EA8dE',
  },
  [destinationTokenEnum.ETHs]: {
    symbol: 'ETHs',
    address: IS_LOCALNET ? '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24' : '0xfBe460669bb911281417a5D76372668d1E4c3BF9',
  },
  [destinationTokenEnum.BNBs]: {
    symbol: 'BNBs',
    address: IS_LOCALNET ? '0x0E696947A06550DEf604e82C26fd9E493e576337' : '0xbe50c3820d3234dca77AdD17F38DF25DEbE7567D',
  },
} as const;

export const tokensOrder = [
  tokenEnum.USDT,
  tokenEnum.USDC,
  tokenEnum.BUSD,
  tokenEnum.DAI,
  tokenEnum.DOC,
  tokenEnum.RDOC,
  tokenEnum.DUMMY1,
  tokenEnum.DUMMY2,
  tokenEnum.DUMMY3,
];

const offlineTokenAddresses = {
  'DUMMY1e': '0x86072CbFF48dA3C1F01824a6761A03F105BCC697',
  'DUMMY1b': '0xFF6049B87215476aBf744eaA3a476cBAd46fB1cA',
  'DUMMY1': '0xA586074FA4Fe3E546A132a16238abe37951D41fE',
  'DUMMY2e': '0xc0b3B62DD0400E4baa721DdEc9B8A384147b23fF',
  'DUMMY2b': '0xCeeFD27e0542aFA926B87d23936c79c276A48277',
  'DUMMY2': '0x47a2Db5D68751EeAdFBC44851E84AcDB4F7299Cc',
  'DUMMY3e': '0xb4fFe5983B0B748124577Af4d16953bd096b6897',
  'DUMMY3b': '0xFF5181e2210AB92a5c9db93729Bc47332555B9E9',
  'DUMMY3': '0x6f84742680311CEF5ba42bc10A71a4708b4561d1',

  'DOC': '0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0',
  'rDOC': '0xC3De9F38581f83e281f260d0DdbaAc0e102ff9F8',
  'USDTes': '0x10c5a7930fc417e728574e334b1488b7895c4b81',
  'bsUSDT': '0x43bc3f0ffff6c9bbf3c2eafe464c314d43f561de',
  'USDT': '0x4d5a316d23ebe168d8f887b4447bf8dbfa4901cc', // rUSDT
  'USDCes': '0xcc8eec21ae75f1a2de4ac7b32a7de888a45cf859',
  'bsUSDC': '0x3e2cf87e7ff4048a57f9cdde9368c9f4bfb43adf',
  'DAIes': '0xcb92c8d49ec01b92f2a766c7c3c9c501c45271e0',
  'bsDAI': '0x407ff7d4760d3a81b4740d268eb04490c7dfe7f2',
  'esETH': '0x4f2fc8d55c1888a5aca2503e2f3e5d74eef37c33',
  'bsETH': '0x793ce6f95912d5b43532c2116e1b68993d902272',
  'bsBNB': '0xafa6a1eb7e2282e8854822d2bb412b6db2caba4e',
  'bsBUSD': '0x8c9abb6c9d8d15ddb7ada2e50086e1050ab32688',
};

export const tokensCatalog = {
  ...(IS_LOCALNET ? {
    [tokenEnum.DUMMY1]: {
      name: 'DUMMY1',
      icon: docIcon,
      networks: {
        [chainEnum.ETH]: 'DUMMY1e',
        [chainEnum.BSC]: 'DUMMY1b',
        [chainEnum.RSK]: 'DUMMY1',
      },
      bridgedTo: destinationTokenEnum.ETHs,
    },
    [tokenEnum.DUMMY2]: {
      name: 'DUMMY2',
      icon: docIcon,
      networks: {
        [chainEnum.ETH]: 'DUMMY2e',
        [chainEnum.BSC]: 'DUMMY2b',
        [chainEnum.RSK]: 'DUMMY2',
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.DUMMY3]: {
      name: 'DUMMY3',
      icon: docIcon,
      networks: {
        [chainEnum.ETH]: 'DUMMY3e',
        [chainEnum.BSC]: 'DUMMY3b',
        [chainEnum.RSK]: 'DUMMY3',
      },
      bridgedTo: destinationTokenEnum.BNBs,
    },
  } : {
    [tokenEnum.DOC]: {
      name: 'DOC',
      icon: docIcon,
      networks: {
        [chainEnum.ETH]: null,
        [chainEnum.BSC]: null,
        [chainEnum.RSK]: 'DOC',
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.RDOC]: {
      name: 'rDOC',
      icon: rdocIcon,
      networks: {
        [chainEnum.ETH]: null,
        [chainEnum.BSC]: null,
        [chainEnum.RSK]: 'rDOC',
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.USDT]: {
      name: 'USDT',
      icon: usdtIcon,
      networks: {
        [chainEnum.ETH]: 'USDTes',
        [chainEnum.BSC]: 'bsUSDT',
        [chainEnum.RSK]: 'USDT', // rUSDT
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.USDC]: {
      name: 'USDC',
      icon: usdcIcon,
      networks: {
        [chainEnum.ETH]: 'USDCes',
        [chainEnum.BSC]: 'bsUSDC',
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.DAI]: {
      name: 'DAI',
      icon: daiIcon,
      networks: {
        [chainEnum.ETH]: 'DAIes',
        [chainEnum.BSC]: 'bsDAI',
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    // [tokenEnum.ETH]: {
    //   name: 'ETH',
    //   icon: ethIcon,
    //   networks: {
    //     [chainEnum.ETH]: 'esETH',
    //     [chainEnum.BSC]: 'bsETH',
    //     [chainEnum.RSK]: null,
    //   },
    //   bridgedTo: destinationTokenEnum.ETHs,
    // },
    // [tokenEnum.BNB]: {
    //   name: 'BNB',
    //   icon: bnbIcon,
    //   networks: {
    //     [chainEnum.ETH]: null,
    //     [chainEnum.BSC]: 'bsBNB',
    //     [chainEnum.RSK]: null,
    //   },
    //   bridgedTo: destinationTokenEnum.BNBs,
    // },
    [tokenEnum.BUSD]: {
      name: 'BUSD',
      icon: busdIcon,
      networks: {
        [chainEnum.ETH]: null,
        [chainEnum.BSC]: 'bsBUSD',
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
  }),
};

export function joinWithAddress(symbol: string | null, addresses: Record<string, string>) {
  if (!symbol) {
    return null;
  }
  return addresses[symbol] ? {symbol, address: addresses[symbol]} : null;
}

export function joinWithAddressList(baseCatalog: tokenTypeBase[], addresses: Record<string, string>): tokenType[] {
  return baseCatalog.map(
    ({networks, ...vv}) => ({
      networks: {
        [chainEnum.ETH]: joinWithAddress(networks[chainEnum.ETH], addresses),
        [chainEnum.BSC]: joinWithAddress(networks[chainEnum.BSC], addresses),
        [chainEnum.RSK]: joinWithAddress(networks[chainEnum.RSK], addresses),
      },
      ...vv,
    })
  );
}

export const baseTokenCatalog = Object.entries(tokensCatalog).sort(
  ([kk]) => tokensOrder.indexOf(kk as tokenEnum)
).map(
  ([kk, {bridgedTo, ...vv}]) => ({
    id: kk as tokenEnum,
    bridgedTo: {
      id: bridgedTo,
      ...destinationTokensCatalog[bridgedTo],
    },
    ...vv,
  })
) as tokenTypeBase[];

export const offlineTokenList = joinWithAddressList(baseTokenCatalog, offlineTokenAddresses);

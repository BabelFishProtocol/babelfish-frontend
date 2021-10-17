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
    address: IS_LOCALNET ? '0x0290FB167208Af455bB137780163b7B7a9a10C16' : '0x74858fe37d391f81f89472e1d8bc8ef9cf67b3b1',
  },
  [destinationTokenEnum.ETHs]: {
    symbol: 'ETHs',
    address: IS_LOCALNET ? '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24' : '0x0Fd0d8D78Ce9299Ee0e5676a8d51F938C234162c',
  },
  [destinationTokenEnum.BNBs]: {
    symbol: 'BNBs',
    address: IS_LOCALNET ? '0x0E696947A06550DEf604e82C26fd9E493e576337' : '0x801f223dEF9A4e3A543EACcefB79dcE981Fa2fB5',
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

export const tokensCatalog = {
  ...(IS_LOCALNET ? {
    [tokenEnum.DUMMY1]: {
      name: 'DUMMY1',
      icon: docIcon,
      networks: {
        [chainEnum.ETH]: {
          address: '0x86072CbFF48dA3C1F01824a6761A03F105BCC697',
          symbol: 'DUMMY1e',
        },
        [chainEnum.BSC]: {
          address: '0xFF6049B87215476aBf744eaA3a476cBAd46fB1cA',
          symbol: 'DUMMY1b',
        },
        [chainEnum.RSK]: {
          address: '0xA586074FA4Fe3E546A132a16238abe37951D41fE',
          symbol: 'DUMMY1',
        },
      },
      bridgedTo: destinationTokenEnum.ETHs,
    },
    [tokenEnum.DUMMY2]: {
      name: 'DUMMY2',
      icon: docIcon,
      networks: {
        [chainEnum.ETH]: {
          address: '0xc0b3B62DD0400E4baa721DdEc9B8A384147b23fF',
          symbol: 'DUMMY2e',
        },
        [chainEnum.BSC]: {
          address: '0xCeeFD27e0542aFA926B87d23936c79c276A48277',
          symbol: 'DUMMY2b',
        },
        [chainEnum.RSK]: {
          address: '0x47a2Db5D68751EeAdFBC44851E84AcDB4F7299Cc',
          symbol: 'DUMMY2',
        },
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.DUMMY3]: {
      name: 'DUMMY3',
      icon: docIcon,
      networks: {
        [chainEnum.ETH]: {
          address: '0xb4fFe5983B0B748124577Af4d16953bd096b6897',
          symbol: 'DUMMY3e',
        },
        [chainEnum.BSC]: {
          address: '0xFF5181e2210AB92a5c9db93729Bc47332555B9E9',
          symbol: 'DUMMY3b',
        },
        [chainEnum.RSK]: {
          address: '0x6f84742680311CEF5ba42bc10A71a4708b4561d1',
          symbol: 'DUMMY3',
        },
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
        [chainEnum.RSK]: {
          address: '0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0',
          symbol: 'DOC',
        },
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.RDOC]: {
      name: 'rDOC',
      icon: rdocIcon,
      networks: {
        [chainEnum.ETH]: null,
        [chainEnum.BSC]: null,
        [chainEnum.RSK]: {
          address: '0xC3De9F38581f83e281f260d0DdbaAc0e102ff9F8',
          symbol: 'rDOC',
        },
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.USDT]: {
      name: 'USDT',
      icon: usdtIcon,
      networks: {
        [chainEnum.ETH]: {
          address: '0x10c5a7930fc417e728574e334b1488b7895c4b81',
          symbol: 'USDTes',
        },
        [chainEnum.BSC]: {
          address: '0x43bc3f0ffff6c9bbf3c2eafe464c314d43f561de',
          symbol: 'bsUSDT',
        },
        [chainEnum.RSK]: {
          address: '0x4d5a316d23ebe168d8f887b4447bf8dbfa4901cc',
          symbol: 'rUSDT',
        },
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.USDC]: {
      name: 'USDC',
      icon: usdcIcon,
      networks: {
        [chainEnum.ETH]: {
          address: '0xcc8eec21ae75f1a2de4ac7b32a7de888a45cf859',
          symbol: 'USDCes',
        },
        [chainEnum.BSC]: {
          address: '0x3e2cf87e7ff4048a57f9cdde9368c9f4bfb43adf',
          symbol: 'bsUSDC',
        },
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.DAI]: {
      name: 'DAI',
      icon: daiIcon,
      networks: {
        [chainEnum.ETH]: {
          address: '0xcb92c8d49ec01b92f2a766c7c3c9c501c45271e0',
          symbol: 'DAIes',
        },
        [chainEnum.BSC]: {
          address: '0x407ff7d4760d3a81b4740d268eb04490c7dfe7f2',
          symbol: 'bsDAI',
        },
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
    [tokenEnum.ETH]: {
      name: 'ETH',
      icon: ethIcon,
      networks: {
        [chainEnum.ETH]: {
          address: '0x4f2fc8d55c1888a5aca2503e2f3e5d74eef37c33',
          symbol: 'ETHes',
        },
        [chainEnum.BSC]: {
          address: '0x793ce6f95912d5b43532c2116e1b68993d902272',
          symbol: 'ETHbs',
        },
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.ETHs,
    },
    [tokenEnum.BNB]: {
      name: 'BNB',
      icon: bnbIcon,
      networks: {
        [chainEnum.ETH]: null,
        [chainEnum.BSC]: {
          address: '0xafa6a1eb7e2282e8854822d2bb412b6db2caba4e',
          symbol: 'bsBNB',
        },
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.BNBs,
    },
    [tokenEnum.BUSD]: {
      name: 'BUSD',
      icon: busdIcon,
      networks: {
        [chainEnum.ETH]: null,
        [chainEnum.BSC]: {
          address: '0x8c9abb6c9d8d15ddb7ada2e50086e1050ab32688',
          symbol: 'bsBUSD',
        },
        [chainEnum.RSK]: null,
      },
      bridgedTo: destinationTokenEnum.XUSD,
    },
  }),
};

export const offlineTokenList = Object.entries(tokensCatalog).sort(([kk]) => tokensOrder.indexOf(kk as tokenEnum)).map(
  ([kk, {bridgedTo, ...vv}]) => ({
    id: kk,
    bridgedTo: {
      id: bridgedTo,
      ...destinationTokensCatalog[bridgedTo],
    },
    ...vv,
  })
) as tokenType[];

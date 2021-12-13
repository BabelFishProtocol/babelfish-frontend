import usdtIcon from '../../resources/images/Tokens/Usdt/usdt.png';
// import bnbIcon from '../../resources/images/Tokens/Bnb/bnb.svg';
// import ethIcon from '../../resources/images/Tokens/Eth/eth2.svg';
import daiIcon from '../../resources/images/Tokens/Dai/dai.png';
import usdcIcon from '../../resources/images/Tokens/Usdc/usdc.png';
import busdIcon from '../../resources/images/Tokens/Busd/busd.png';
import docIcon from '../../resources/images/Tokens/Doc/doc.svg';
import rdocIcon from '../../resources/images/Tokens/Rdoc/rdoc.svg';
import {chainEnum} from '../Chains';

const IS_MAINNET = process.env.REACT_APP_PRODUCTION_CHAINS === 'TRUE';

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
  oAddress?: string;
  decimals: number;
};

export interface tokenTypeBase {
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
}

export interface tokenType extends Omit<tokenTypeBase, 'networks'> {
  networks: {
    [chainEnum.RSK]: tokenOnNetworkType | null;
    [chainEnum.BSC]: tokenOnNetworkType | null;
    [chainEnum.ETH]: tokenOnNetworkType | null;
  };
}

export const destinationTokensCatalog = {
  [destinationTokenEnum.XUSD]: {
    symbol: 'XUSD',
    address: IS_MAINNET
      ? '0xb5999795BE0EbB5bAb23144AA5FD6A02D080299F'
      : '0x152123ec3D9fe2Cf57aBc09917C1ba51324EA8dE',
  },
  [destinationTokenEnum.ETHs]: {
    symbol: 'ETHs',
    address: IS_MAINNET ? '' : '0xfBe460669bb911281417a5D76372668d1E4c3BF9',
  },
  [destinationTokenEnum.BNBs]: {
    symbol: 'BNBs',
    address: IS_MAINNET ? '' : '0xbe50c3820d3234dca77AdD17F38DF25DEbE7567D',
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

const offlineTokenAddresses = IS_MAINNET
  ? {
      DOC: ['0xe700691dA7b9851F2F35f8b8182c69c53CcaD9Db', , 18],
      RDOC: ['0x2d919f19D4892381d58EdEbEcA66D5642ceF1A1F', , 18],
      USDTes: [
        '0xD9665EA8F5fF70Cf97E1b1Cd1B4Cd0317b0976e8',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        6,
      ],
      USDTbs: [
        '0xFf4299bCA0313C20A61dc5eD597739743BEf3f6d',
        '0x55d398326f99059ff775485246999027b3197955',
        18,
      ],
      rUSDT: ['0xef213441A85dF4d7ACbDaE0Cf78004e1E486bB96', , 18],
      USDCes: [
        '0x8D1f7CbC6391D95E2774380e80A666FEbf655D6b',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        6,
      ],
      USDCbs: [
        '0x91EDceE9567cd5612c9DEDeaAE24D5e574820af1',
        '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        18,
      ],
      DAIes: [
        '0x1A37c482465e78E6DAbE1Ec77B9a24D4236D2A11',
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        18,
      ],
      DAIbs: [
        '0x6A42Ff12215a90f50866A5cE43A9c9C870116e76',
        '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
        18,
      ],
      BUSDbs: [
        '0x61e9604e31a736129d7f5C58964c75935b2d80D6',
        '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        18,
      ],
    }
  : {
      DOC: ['0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0', , 18],
      rDOC: ['0xC3De9F38581f83e281f260d0DdbaAc0e102ff9F8', , 18],
      USDTes: [
        '0x10c5a7930fc417e728574e334b1488b7895c4b81',
        '0xff364ffa4962cb172203a5be01d17cf3fef02419',
        6,
      ],
      bsUSDT: [
        '0x43bc3f0ffff6c9bbf3c2eafe464c314d43f561de',
        '0x268e3bf855cbcdf8fe31ba3557a554ab2283351f',
        18,
      ],
      USDT: ['0x4d5a316d23ebe168d8f887b4447bf8dbfa4901cc', , 18], // rUSDT
      USDCes: [
        '0xcc8eec21ae75f1a2de4ac7b32a7de888a45cf859',
        '0x4C68058992b8aD1243eE23A5923023C0e15Cf43F',
        6,
      ],
      bsUSDC: [
        '0x3e2cf87e7ff4048a57f9cdde9368c9f4bfb43adf',
        '0x0b654c687dc8b828139406c070e0a34486e5072b',
        18,
      ],
      DAIes: [
        '0xcb92c8d49ec01b92f2a766c7c3c9c501c45271e0',
        '0x974cf21396D4D29F8e63Ac07eCfcbaB51a739bc9',
        18,
      ],
      bsDAI: [
        '0x407ff7d4760d3a81b4740d268eb04490c7dfe7f2',
        '0x83241490517384cb28382bdd4d1534ee54d9350f',
        18,
      ],
      // 'esETH': ['0x4f2fc8d55c1888a5aca2503e2f3e5d74eef37c33',],
      // 'bsETH': ['0x793ce6f95912d5b43532c2116e1b68993d902272',],
      // 'bsBNB': ['0xafa6a1eb7e2282e8854822d2bb412b6db2caba4e',],
      bsBUSD: [
        '0x8c9abb6c9d8d15ddb7ada2e50086e1050ab32688',
        '0x137BEc8c83740920ebc4f29f51C7B65b75Beec83',
        18,
      ],
    };

export const tokensCatalog = {
  ...(IS_MAINNET
    ? {
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
            [chainEnum.RSK]: 'RDOC',
          },
          bridgedTo: destinationTokenEnum.XUSD,
        },
        [tokenEnum.USDT]: {
          name: 'USDT',
          icon: usdtIcon,
          networks: {
            [chainEnum.ETH]: 'USDTes',
            [chainEnum.BSC]: 'USDTbs',
            [chainEnum.RSK]: 'rUSDT',
          },
          bridgedTo: destinationTokenEnum.XUSD,
        },
        [tokenEnum.USDC]: {
          name: 'USDC',
          icon: usdcIcon,
          networks: {
            [chainEnum.ETH]: 'USDCes',
            [chainEnum.BSC]: 'USDCbs',
            [chainEnum.RSK]: null,
          },
          bridgedTo: destinationTokenEnum.XUSD,
        },
        [tokenEnum.DAI]: {
          name: 'DAI',
          icon: daiIcon,
          networks: {
            [chainEnum.ETH]: 'DAIes',
            [chainEnum.BSC]: 'DAIbs',
            [chainEnum.RSK]: null,
          },
          bridgedTo: destinationTokenEnum.XUSD,
        },
        [tokenEnum.BUSD]: {
          name: 'BUSD',
          icon: busdIcon,
          networks: {
            [chainEnum.ETH]: null,
            [chainEnum.BSC]: 'BUSDbs',
            [chainEnum.RSK]: null,
          },
          bridgedTo: destinationTokenEnum.XUSD,
        },
      }
    : {
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

export function joinWithAddress(
  symbol: string | null,
  addresses: Record<string, string>,
) {
  if (!symbol) {
    return null;
  }
  return addresses[symbol]
    ? {
        symbol,
        address: addresses[symbol][0],
        oAddress: addresses[symbol][1],
        decimals: addresses[symbol][2],
      }
    : null;
}

export function joinWithAddressList(
  baseCatalog: tokenTypeBase[],
  addresses: any,
): tokenType[] {
  return baseCatalog.map(
    ({networks, ...vv}) =>
      ({
        networks: {
          [chainEnum.ETH]: joinWithAddress(networks[chainEnum.ETH], addresses),
          [chainEnum.BSC]: joinWithAddress(networks[chainEnum.BSC], addresses),
          [chainEnum.RSK]: joinWithAddress(networks[chainEnum.RSK], addresses),
        },
        ...vv,
      } as tokenType),
  );
}

export const baseTokenCatalog = Object.entries(tokensCatalog)
  .sort(([kk]) => tokensOrder.indexOf(kk as tokenEnum))
  .map(([kk, {bridgedTo, ...vv}]) => ({
    id: kk as tokenEnum,
    bridgedTo: {
      id: bridgedTo,
      ...destinationTokensCatalog[bridgedTo],
    },
    ...vv,
  })) as tokenTypeBase[];

export const offlineTokenList = joinWithAddressList(
  baseTokenCatalog,
  offlineTokenAddresses,
);

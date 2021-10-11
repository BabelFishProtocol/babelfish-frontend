import usdtIcon from '../../resources/images/Tokens/Usdt/usdt.png';
// import paxIcon from '../../resources/images/Tokens/Pax/pax.png';
import daiIcon from '../../resources/images/Tokens/Dai/dai.png';
import usdcIcon from '../../resources/images/Tokens/Usdc/usdc.png';
import busdIcon from '../../resources/images/Tokens/Busd/busd.png';
import docIcon from '../../resources/images/Tokens/Doc/doc.svg';
import rdocIcon from '../../resources/images/Tokens/Rdoc/rdoc.svg';
import {chainEnum} from '../Chains';

export enum tokenEnum {
  USDT = 'USDT',
  USDC = 'USDC',
  BUSD = 'BUSD',
  // PAX = 'PAX',
  DAI = 'DAI',
  DOC = 'DOC',
  RDOC = 'RDOC',
}

export type tokenType = {name?: string; id: tokenEnum; symbol: string; address: string; icon?: string, networks: chainEnum[]};

export const tokensOrder = [
  tokenEnum.USDT,
  tokenEnum.USDC,
  tokenEnum.BUSD,
  tokenEnum.DAI,
  tokenEnum.DOC,
  tokenEnum.RDOC,
];

export const tokensCatalog = {
  [tokenEnum.USDT]: {name: 'USDT', icon: usdtIcon, symbol: 'USDT', address: '0x0', networks: [chainEnum.ETH, chainEnum.BSC]},
  [tokenEnum.USDC]: {name: 'USDC', icon: usdcIcon, symbol: 'USDC', address: '0x0', networks: [chainEnum.ETH, chainEnum.BSC]},
  [tokenEnum.BUSD]: {name: 'BUSD', icon: busdIcon, symbol: 'BUSD', address: '0x0', networks: [chainEnum.BSC]},
  [tokenEnum.DAI]: {name: 'DAI', icon: daiIcon, symbol: 'DAI', address: '0x0', networks: [chainEnum.ETH, chainEnum.BSC]},
  [tokenEnum.DOC]: {name: 'DOC', icon: docIcon, symbol: 'DOC', address: '0x0', networks: [] as chainEnum[]},
  [tokenEnum.RDOC]: {name: 'RDOC', icon: rdocIcon, symbol: 'RDOC', address: '0x0', networks: [] as chainEnum[]},
};

export const tokens = Object.entries(tokensCatalog).sort(([kk]) => tokensOrder.indexOf(kk as tokenEnum)).map(([kk, vv]) => ({
  id: kk,
  ...vv,
})) as tokenType[];

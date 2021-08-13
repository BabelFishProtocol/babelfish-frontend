import usdtIcon from '../../resources/images/Tokens/Usdt/usdt.png';
// import paxIcon from '../../resources/images/Tokens/Pax/pax.png';
import daiIcon from '../../resources/images/Tokens/Dai/dai.png';
import usdcIcon from '../../resources/images/Tokens/Usdc/usdc.png';
import busdIcon from '../../resources/images/Tokens/Busd/busd.png';
import docIcon from '../../resources/images/Tokens/Doc/doc.svg';
import rdocIcon from '../../resources/images/Tokens/Rdoc/rdoc.svg';

export enum tokenEnum {
  USDT = 'USDT',
  USDC = 'USDC',
  BUSD = 'BUSD',
  // PAX = 'PAX',
  DAI = 'DAI',
  DOC = 'DOC',
  RDOC = 'RDOC',
}

export type tokenType = {name: string; id: tokenEnum; icon: string};

export const tokens = [
  {name: 'USDT', id: tokenEnum.USDT, icon: usdtIcon},
  {name: 'USDC', id: tokenEnum.USDC, icon: usdcIcon},
  {name: 'BUSD', id: tokenEnum.BUSD, icon: busdIcon},
  // {name: 'PAX', id: tokenEnum.PAX, icon: paxIcon},
  {name: 'DAI', id: tokenEnum.DAI, icon: daiIcon},
  {name: 'DOC', id: tokenEnum.DOC, icon: docIcon},
  {name: 'RDOC', id: tokenEnum.RDOC, icon: rdocIcon},
];

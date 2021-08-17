import metamaskIcon from '../../resources/images/Wallets/Metamask/logo.svg';
import portisIcon from '../../resources/images/Wallets/Portis/logo.svg';
import liqualityIcon from '../../resources/images/Wallets/Liquality/logo.png';
import niftyIcon from '../../resources/images/Wallets/Nifty/logo.png';

export enum walletEnum {
  Liquality = 'Liquality',
  Metamask = 'Metamask',
  Nifty = 'Nifty',
  Portis = 'Portis',
}

export type walletType = {name: string; id: walletEnum; icon: string};

export const wallets = [
  {name: 'Liquality', id: walletEnum.Liquality, icon: liqualityIcon},
  {name: 'Nifty', id: walletEnum.Nifty, icon: niftyIcon},
  {name: 'Metamask', id: walletEnum.Metamask, icon: metamaskIcon},
  {name: 'Portis', id: walletEnum.Portis, icon: portisIcon},
];

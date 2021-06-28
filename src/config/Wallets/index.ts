import metamaskIcon from '../../resources/images/Wallets/Metamask/logo.svg';
import portisIcon from '../../resources/images/Wallets/Portis/logo.svg';
import liqualityIcon from '../../resources/images/Wallets/Liquality/logo.png';

export enum walletEnum {
  Metamask = 'Metamask',
  Portis = 'Portis',
  Liquality = 'Liquality',
}

export type walletType = {name: string; id: walletEnum; icon: string};

export const wallets = [
  {name: 'Metamask', id: walletEnum.Metamask, icon: metamaskIcon},
  {name: 'Portis', id: walletEnum.Portis, icon: portisIcon},
  {name: 'Liquality', id: walletEnum.Liquality, icon: liqualityIcon},
];

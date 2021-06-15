import metamaskIcon from '../../resources/images/Wallets/Metamask/logo.svg';

export enum walletEnum {
  Metamask = 'Metamask',
}

export type walletType = {name: string; id: walletEnum; icon: string};

export const wallets = [
  {name: 'Metamask', id: walletEnum.Metamask, icon: metamaskIcon},
];

import ethIcon from '../../resources/images/Chains/ETH/logo.png';
import bscIcon from '../../resources/images/Chains/BSC/logo.png';
import rskIcon from '../../resources/images/Chains/RSK/logo.png';

export enum chainEnum {
  ETH = 'ETH',
  BSC = 'BSC',
  RSK = 'RSK',
}

export type chainType = {name: string; id: chainEnum; icon: string};

export const chains = [
  {name: 'ETH Network', id: chainEnum.ETH, icon: ethIcon},
  {name: 'BSC Network', id: chainEnum.BSC, icon: bscIcon},
  {name: 'RSK Network', id: chainEnum.RSK, icon: rskIcon},
];

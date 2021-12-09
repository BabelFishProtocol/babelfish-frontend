import BridgeABI from './abi/Bridge.json';
import BasketManagerABI from './abi/BasketManager.json';
import BasketManagerV3ABI from './abi/BasketManagerV3.json';
import MassetV3ABI from './abi/MassetV3.json';
import {destinationTokenEnum} from "../config/Tokens";
import {chainEnum} from "../config/Chains";

const IS_MAINNET = process.env.REACT_APP_PRODUCTION_CHAINS === 'TRUE';

export const TO_RSK_BRIDGE_ADDRESSES = {
  [chainEnum.BSC]: {
    address: IS_MAINNET ? '0xdfc7127593c8af1a17146893f10e08528f4c2aa7' : '0x862e8aff917319594cc7faaae5350d21196c086f',
    abi: BridgeABI as any,
    allowTokenAddress: IS_MAINNET ? '0x05b68e70168e876b2025f837bc8e0b2312d5327d' : '0xeb23e848ceca88b7d0c019c7186bb86cefadd0bd',
  },
  [chainEnum.ETH]: {
    address: IS_MAINNET ? '0x33C0D33a0d4312562ad622F91d12B0AC47366EE1' : '0xc0e7a7fff4aba5e7286d5d67dd016b719dcc9156',
    abi: BridgeABI as any,
    allowTokenAddress: IS_MAINNET ? '0x8DF20c2c85Bee0c3DA250dA96D892598C70aA1bE' : '0x918b9fd8c2e9cf5625ea00ca6cfa270a44050d01',
  },
};

export const FROM_RSK_BRIDGE_ADDRESSES = {
  [chainEnum.BSC]: {
    address: IS_MAINNET ? '0x971b97c8cc82e7d27bc467c2dc3f219c6ee2e350' : '0x2b2bcad081fa773dc655361d1bb30577caa556f8',
    abi: BridgeABI as any,
    allowTokenAddress: IS_MAINNET ? '0xa2f50a2c699c1aa3b9089f6b565d4999d45d8983' : '0xa9f2ccb27fe01479a1f21f3a236989c614f801bc',
  },
  [chainEnum.ETH]: {
    address: IS_MAINNET ? '0x1CcAd820B6d031B41C54f1F3dA11c0d48b399581' : '0x2b456e230225C4670FBF10b9dA506C019a24cAC7',
    abi: BridgeABI as any,
    allowTokenAddress: IS_MAINNET ? '0xd2090fe759613C3A3E2962c6bB2ad046f62d32fF' : '0x9bc4243880730a9Bca69addB0f971700d39D1646',
  },
};

export const BRIDGED_ADDRESSES = {
  [destinationTokenEnum.ETHs]: {
    BasketManager: {
      address: IS_MAINNET ? '' : '0x24d3AC480Fc442Ee5110edd105544d8Bc9f1D023',
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_MAINNET ? '' : '0x0941F377eD05D2269675aFE3F13cA873b78C3213',
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_MAINNET ? '' : '0x1101dCA11f9d361d56A7BA782e37e638B8F10bCE',
      abi: MassetV3ABI as any,
    },
  },
  [destinationTokenEnum.XUSD]: {
    BasketManager: {
      address: IS_MAINNET ? '' : '0x79a9B331D15C560A9c144E7B7bdfeB683A25317e',
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_MAINNET ? '' : '0x0805ccCAa1e44EFFa98e409675176F2e83AFff19',
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_MAINNET ? '0x1440d19436bEeaF8517896bffB957a88EC95a00F' : '0xca8b437d9d586b938CE000e765476A0594856b51',
      abi: MassetV3ABI as any,
    },
  },
  [destinationTokenEnum.BNBs]: {
    BasketManager: {
      address: IS_MAINNET ? '' : '0xE77078b15EC3fb481a4e44CE2A464Ae8d2aC115e',
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_MAINNET ? '' : '0x22eeb4F794d90fFa014996Ffb30Ca2295Ca2AD65',
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_MAINNET ? '' : '0x31c7155C560c364C103A4aCFdB860803Ce93709d',
      abi: MassetV3ABI as any,
    },
  },
} as const;

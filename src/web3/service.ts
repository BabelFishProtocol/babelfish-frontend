import Web3 from 'web3';
import BN from 'bn.js';
import GovernorAdminABI from './abi/GovernorAdmin.json';
import BasketManagerABI from './abi/BasketManager.json';
import BasketManagerV3ABI from './abi/BasketManagerV3.json';
import MassetV3ABI from './abi/MassetV3.json';
// import BasketManagerV3ABI from './abi/BasketManagerV3.json';
// import MassetProxyABI from './abi/MassetProxy.json';
import ERC20ABI from './abi/ERC20.json';
import {
  baseTokenCatalog,
  destinationTokenEnum,
  destinationTokensCatalog,
  joinWithAddressList,
  offlineTokenList,
  tokenType
} from "../config/Tokens";
import moment from "moment";
// import {chainEnum} from "../config/Chains";

// const IS_TESTNET = process.env.REACT_APP_CHAIN_ID === '31';
const IS_LOCALNET = !['31', '30'].includes(process.env.REACT_APP_CHAIN_ID || '');
const IS_MAINNET = process.env.REACT_APP_CHAIN_ID === '30';

const BRIDGED_ADDRESSES = {
  [destinationTokenEnum.ETHs]: {
    BasketManager: {
      address: IS_LOCALNET ? '0xe982E462b094850F12AF94d21D470e21bE9D0E9C' : (IS_MAINNET ? '' : '0x24d3AC480Fc442Ee5110edd105544d8Bc9f1D023'),
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_LOCALNET ? '0x7C728214be9A0049e6a86f2137ec61030D0AA964' : (IS_MAINNET ? '' : '0x0941F377eD05D2269675aFE3F13cA873b78C3213'),
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_LOCALNET ? '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B' : (IS_MAINNET ? '' : '0x1101dCA11f9d361d56A7BA782e37e638B8F10bCE'),
      abi: MassetV3ABI as any,
    },
  },
  [destinationTokenEnum.XUSD]: {
    BasketManager: {
      address: IS_LOCALNET ? '0x26b4AFb60d6C903165150C6F0AA14F8016bE4aec' : (IS_MAINNET ? '' : '0x79a9B331D15C560A9c144E7B7bdfeB683A25317e'),
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_LOCALNET ? '0xf19A2A01B70519f67ADb309a994Ec8c69A967E8b' : (IS_MAINNET ? '' : '0x0805ccCAa1e44EFFa98e409675176F2e83AFff19'),
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_LOCALNET ? '0x67B5656d60a809915323Bf2C40A8bEF15A152e3e' : (IS_MAINNET ? '0x1440d19436bEeaF8517896bffB957a88EC95a00F' : '0x2F891EfDC0c876ce5e9a2EbD35afb272F15A2Fd2'),
      abi: MassetV3ABI as any,
    },
  },
  [destinationTokenEnum.BNBs]: {
    BasketManager: {
      address: IS_LOCALNET ? '0xFC628dd79137395F3C9744e33b1c5DE554D94882' : (IS_MAINNET ? '' : '0xE77078b15EC3fb481a4e44CE2A464Ae8d2aC115e'),
      abi: BasketManagerABI as any,
    },
    BasketManagerNew: {
      address: IS_LOCALNET ? '0x9e90054F4B6730cffAf1E6f6ea10e1bF9dD26dbb' : (IS_MAINNET ? '' : '0x22eeb4F794d90fFa014996Ffb30Ca2295Ca2AD65'),
      abi: BasketManagerV3ABI as any,
    },
    MassetV3: {
      address: IS_LOCALNET ? '0xA94B7f0465E98609391C623d0560C5720a3f2D33' : (IS_MAINNET ? '' : '0x31c7155C560c364C103A4aCFdB860803Ce93709d'),
      abi: MassetV3ABI as any,
    },
  },
} as const;

export async function listBassets(web3: Web3, bridgedTo: destinationTokenEnum) {
  const basketManager = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.abi, BRIDGED_ADDRESSES[bridgedTo].BasketManagerNew.address);
  const tokenAddresses = await basketManager.methods.getBassets().call() as string[];
  // ToDo: Fetch network based on bridge
  const tokenAddressesMap = Object.fromEntries((await Promise.all(tokenAddresses.map(
    async (tokenAddress) => {
      const myERC20 = new web3.eth.Contract(ERC20ABI as any, tokenAddress);
      const tokenSymbol = await myERC20.methods.symbol().call();
      return [tokenSymbol, tokenAddress]
    }
  ))).filter(Boolean));
  return tokenAddressesMap;
}

export async function getTokenBalance(web3: Web3, tokenAddress: string) : Promise<BN> {
  const account = (await web3.eth.getAccounts())[0];
  const tokenContract = new web3.eth.Contract(ERC20ABI as any, tokenAddress.toUpperCase());
  const balance = await tokenContract.methods.balanceOf(account).call();
  return balance;
}

function setEventListeners(rr: any, emitter: EthLiveTransaction) {
  const confirmationHandler = (confirmation: number, receipt: any) => {
    if (confirmation > 0) {
      emitter.emit('success', ({
        transactionHash: receipt.transactionHash,
        cumulativeGasUsed: receipt.cumulativeGasUsed,
        gasUsed: receipt.gasUsed,
        status: 'success',
        source: emitter.source,
        destination: emitter.destination,
        detectedAt: emitter.detectedAt,
      } as EthTransaction));
      rr.off('confirmation', confirmationHandler);
    }
  };
  rr.on('confirmation', confirmationHandler);
  rr.once('transactionHash', (transactionHash: string) => {
    emitter.detectedAt = new Date();
    emitter.emit('receipt', ({
      transactionHash,
      cumulativeGasUsed: undefined,
      gasUsed: undefined,
      status: 'pending',
      source: emitter.source,
      destination: emitter.destination,
      detectedAt: emitter.detectedAt,
    } as EthTransaction));
  });
  rr.once('error', (error: Error) => {
    const receipt = (error as any).receipt;
    console.log('error', error);
    emitter.emit('fail', ({
      transactionHash: receipt.transactionHash,
      cumulativeGasUsed: receipt.cumulativeGasUsed,
      gasUsed: receipt.gasUsed,
      status: 'failed',
      source: emitter.source,
      destination: emitter.destination,
      detectedAt: emitter.detectedAt,
    } as EthTransaction));
  });
}

export async function redeem(
  web3: Web3, bAssetAddress: string, bAssetName: string, quantity: BN, bridgedTo: destinationTokenEnum,
) : Promise<EthLiveTransaction> {
  const account = (await web3.eth.getAccounts())[0];
  const mAssetContract = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi, BRIDGED_ADDRESSES[bridgedTo].MassetV3.address);
  const rr = mAssetContract.methods.redeem(bAssetAddress, quantity).send({from: account});
  const emitter = new EthLiveTransaction({
    currency: bAssetName,
    amount: quantity,
  }, {
    currency: bridgedTo.toString(),
    amount: quantity,
  });
  setEventListeners(rr, emitter);
  return emitter;
}

export async function deposit(
  web3: Web3, bAssetAddress: string, bAssetName: string, quantity: BN, bridgedTo: destinationTokenEnum,
) : Promise<EthLiveTransaction> {
  const bAssetContract = new web3.eth.Contract(ERC20ABI as any, bAssetAddress.toUpperCase());
  const mAssetAddress = BRIDGED_ADDRESSES[bridgedTo].MassetV3.address;
  const mAssetContract = new web3.eth.Contract(BRIDGED_ADDRESSES[bridgedTo].MassetV3.abi, mAssetAddress);
  const account = (await web3.eth.getAccounts())[0];
  await bAssetContract.methods.approve(mAssetAddress, quantity).send({from: account});
  const rr = mAssetContract.methods.mint(bAssetAddress, quantity).send({from: account});
  const emitter = new EthLiveTransaction({
    currency: bAssetName,
    amount: quantity,
  }, {
    currency: bridgedTo.toString(),
    amount: quantity,
  });
  setEventListeners(rr, emitter);
  return emitter;
}

export class EthLiveTransaction {
  private readonly events: Record<string, Function>;
  private readonly missCalls: Record<string, any>;
  public source: CurrencyAmount;
  public destination: CurrencyAmount;
  public detectedAt?: Date;
  constructor(source: CurrencyAmount, destination: CurrencyAmount) {
    this.events = {};
    this.missCalls = {};
    this.source = source;
    this.destination = destination;
  }
  on(name: string, listener: Function) {
    this.events[name] = listener;
    if (this.missCalls[name]) {
      this.missCalls[name].forEach(
        (dd: any) => {
          listener(dd);
        },
      );
    }
  }
  off(name: string) {
    delete this.events[name];
  }
  offAll() {
    for (let kk in this.events) {
      delete this.events[kk];
    }
  }
  emit(name: string, data: any) {
    this.events[name] && this.events[name](data);
    if (!this.missCalls[name]) {
      this.missCalls[name] = [];
    }
    this.missCalls[name].push(data);
  }
}

export interface CurrencyAmount {
  amount: BN;
  currency: string;
}

export type EthTransactionStatus = 'success' | 'failed' | 'pending';

export interface EthTransaction {
  transactionHash: string;
  cumulativeGasUsed?: number;
  gasUsed?: number;
  status: EthTransactionStatus;
  source: CurrencyAmount;
  destination: CurrencyAmount;
  detectedAt: Date;
}

export function formatAmount(inn: BN) {
  const st = Web3.utils.fromWei(inn);
  const [inter, decimals] = st.split('.');
  return [inter, (decimals || '').padEnd(2, '0').substr(0, 2)].join('.');
}

export function formatCurrencyAmount(inn: CurrencyAmount) {
  return `${formatAmount(inn.amount)} ${inn.currency}`;
}

export function formatDate(inn: Date) {
  return `${moment(inn).utc().format('DD/MM/YY-HH:mm')} UTC`;
}

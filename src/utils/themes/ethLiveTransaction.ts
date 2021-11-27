import BN from "bn.js";
import Web3 from "web3";
import moment from "moment";

export class EthLiveTransaction {
  private readonly events: Record<string, Function>;
  private readonly missCalls: Record<string, any>;
  public getNext: () => (EthLiveTransaction | null);
  public source: CurrencyAmount;
  public destination: CurrencyAmount;
  public detectedAt?: Date;
  constructor(ethCall: () => any, source: CurrencyAmount, destination: CurrencyAmount, getNext: () => (EthLiveTransaction | null) = () => null) {
    this.getNext = getNext;
    this.events = {};
    this.missCalls = {};
    this.source = source;
    this.destination = destination;
    this.setEventListeners(ethCall());
  }
  private setEventListeners(rr: any) {
    const confirmationHandler = (confirmation: number, receipt: any) => {
      if (confirmation > 0) {
        this.emit('success', ({
          transactionHash: receipt.transactionHash,
          cumulativeGasUsed: receipt.cumulativeGasUsed,
          gasUsed: receipt.gasUsed,
          status: 'success',
          source: this.source,
          destination: this.destination,
          detectedAt: this.detectedAt,
        } as EthTransaction));
        rr.off('confirmation', confirmationHandler);
      }
    };
    rr.on('confirmation', confirmationHandler);
    rr.once('transactionHash', (transactionHash: string) => {
      this.detectedAt = new Date();
      this.emit('receipt', ({
        transactionHash,
        cumulativeGasUsed: undefined,
        gasUsed: undefined,
        status: 'pending',
        source: this.source,
        destination: this.destination,
        detectedAt: this.detectedAt,
      } as EthTransaction));
    });
    rr.once('error', (error: Error) => {
      const receipt = (error as any).receipt;
      console.log('error', error);
      this.emit('fail', ({
        transactionHash: receipt?.transactionHash,
        cumulativeGasUsed: receipt?.cumulativeGasUsed,
        gasUsed: receipt?.gasUsed,
        status: 'failed',
        source: this.source,
        destination: this.destination,
        detectedAt: this.detectedAt,
      } as EthTransaction));
    });
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

export interface Amount {
  amount: BN;
  decimals: number;
}

export interface CurrencyAmount {
  amount: BN;
  currency: string;
  decimals?: number;
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

function amountAsBN(inn: Amount): BN {
  return inn.amount.mul(new BN(10).pow(new BN(18 - inn.decimals)));
}

export function amountAsBN2(inn: Amount): BN {
  return inn.amount.div(new BN(10).pow(new BN(18 - inn.decimals)));
}

export function formatAmount(inn: Amount): string {
  const st = Web3.utils.fromWei(amountAsBN(inn));
  const [inter, decimals] = st.split('.');
  return [inter, (decimals || '').padEnd(2, '0').substr(0, 2)].join('.');
}

export function formatCurrencyAmount(inn: CurrencyAmount): string {
  return `${formatAmount({...inn, decimals: inn.decimals === undefined ? 18 : inn.decimals})} ${inn.currency}`;
}

export function formatDate(inn: Date): string {
  return `${moment(inn).utc().format('DD/MM/YY-HH:mm')} UTC`;
}

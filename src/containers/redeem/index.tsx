import React, {useEffect, useState} from 'react';
import BN from 'bn.js';
import {Steps} from '../../components/steps';
import {Card, CardTitled, TransactionCard} from '../../lib/components';
import {ChainGroupNoSwitch} from '../../components/SelectChain';
import {chainEnum, trxExplorerLink} from "../../config/Chains";
import {RedeemContent} from './styles';
import {RedeemBalance} from './steps/redeemBalance';
import {
  EthLiveTransaction,
  EthTransaction,
  formatCurrencyAmount,
  formatDate
} from "../../utils/themes/ethLiveTransaction";

const STEPS = [
  'Select Redemption Network',
  'Withdraw from BabelFish',
  'Burning Process',
  'Burning Complete',
];

export const Redeem = () => {
  const [valueCurrentNetwork, setCurrentNetwork] = useState<chainEnum | undefined>(undefined);
  const [valueLiveTransaction, setLiveTransaction] = useState<EthLiveTransaction | undefined>(undefined);
  const [valueTransactionData, setTransactionData] = useState<EthTransaction | undefined>(undefined);
  useEffect(
    () => {
      if (valueLiveTransaction) {
        valueLiveTransaction.on('receipt', setTransactionData);
        valueLiveTransaction.on(
          'success',
          (dd: any) => {
            setTransactionData(dd);
            valueLiveTransaction.offAll();
          }
        );
        valueLiveTransaction.on(
          'fail',
          (dd: any) => {
            setTransactionData(dd);
            valueLiveTransaction.offAll();
          }
        );
        return () => valueLiveTransaction.offAll();
      }
    },
    [valueLiveTransaction, setTransactionData],
  );
  let content;
  let currentStep;
  if (!valueCurrentNetwork) {
    currentStep = 0;
    content = (
      <ChainGroupNoSwitch
        onChange={(name) => {
          setCurrentNetwork(name);
        }}
      />
    );
  } else if (!valueTransactionData) {
    currentStep = 1;
    content = <RedeemBalance network={valueCurrentNetwork} onSubmit={setLiveTransaction}/>;
  } else {
    const transactionData = [
      {name: 'Date/Time', value: formatDate(valueTransactionData.detectedAt), style: {whiteSpace: 'nowrap'}},
      {name: 'Withdraw Amount', value: formatCurrencyAmount(valueTransactionData.source)},
      {name: 'Amount Burned', value: formatCurrencyAmount(valueTransactionData.destination)},
      {name: 'Gas Fee', value: `${formatCurrencyAmount({currency: 'ETH', amount: new BN(valueTransactionData?.gasUsed || 0)})}`},
      // {
      //   name: 'ETH Redeem',
      //   value: <Link>0X413.89054</Link>,
      // },
      // {
      //   name: 'RSK Relay Hash',
      //   value: <Link>0X413.89054</Link>,
      // },
    ];
    content = (
      <div className="d-flex justify-content-center">
        <TransactionCard
          processName="redeeming"
          transactionData={transactionData}
          status={valueTransactionData.status}
          explorerLink={trxExplorerLink(chainEnum.RSK, valueTransactionData.transactionHash)}
          explorerName="explorer"
        />
      </div>
    );
    currentStep = valueTransactionData.status === 'pending' ? 2 : 3;
  }
  return (
    <div className="row g-3 align-items-start h-100">
      <div className="col-12 col-md-5 col-lg-4 col-xl-3 m-0 h-100">
        <Card className="py-3 h-100">
          <Steps
            steps={STEPS}
            currentStep={currentStep}
            onStepChange={(newStep) => {
              if (newStep === 0) {
                setCurrentNetwork(undefined);
              } else if (newStep === 1) {
                setTransactionData(undefined);
              }
            }}
          />
        </Card>
      </div>
      <div className="col-12 col-md-7 col-lg-8 col-xl-9 m-0 h-100">
        <CardTitled
          title={`REDEEM STABLECOINS OUT OF BABELFISH ${
            valueCurrentNetwork ? `TO ${valueCurrentNetwork}` : ''
          }`}>
          <div className="h-100 position-relative">
            <RedeemContent>
              {content}
            </RedeemContent>
          </div>
        </CardTitled>
      </div>
    </div>
  );
};

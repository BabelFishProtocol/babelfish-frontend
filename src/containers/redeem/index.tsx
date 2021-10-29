import React, {useEffect, useState} from 'react';
import moment from 'moment';
import BN from 'bn.js';
import {Steps} from '../../components/steps';
import {Card, CardTitled, TransactionCard} from '../../lib/components';
import {RedeemContent, Link} from './styles';
import {ChainGroup} from '../../components/SelectChain';
import {RedeemBalance} from './steps/redeemBalance';
import {chainEnum} from "../../config/Chains";
import type {CurrencyAmount, EthLiveTransaction} from "../../web3/service";
import {EthTransaction} from "../../web3/service";

const STEPS = [
  'Select Redemption Network',
  'Withdraw from BabelFish',
  'Burning Process',
  'Burning Complete',
];

function formatCurrencyAmount(inn: CurrencyAmount) {
  // ToDo: To fixed 2
  return `${inn.amount.toString(10)} ${inn.currency}`;
}

function fromWei(inn: BN | number) {
  return new BN(inn).toString(10);
}

export const Redeem = () => {
  const [valueCurrentNetwork, setCurrentNetwork] = useState<chainEnum | undefined>(undefined);
  const [valueLiveTransaction, setLiveTransaction] = useState<EthLiveTransaction | undefined>(undefined);
  const [valueTransactionData, setTransactionData] = useState<EthTransaction | undefined>(undefined);
  useEffect(
    () => {
      if (valueLiveTransaction) {
        valueLiveTransaction.on('receipt', setTransactionData);
        valueLiveTransaction.on('success', setTransactionData);
        valueLiveTransaction.on('fail', setTransactionData);
        return () => valueLiveTransaction.offAll();
      }
    },
    [valueLiveTransaction],
  );
  let content;
  let currentStep;
  if (!valueCurrentNetwork) {
    currentStep = 0;
    content = (
      <ChainGroup
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
      {name: 'Date/Time', value: moment(valueTransactionData.detectedAt).format('DD/MM/YY')},
      {name: 'Withdraw Amount', value: formatCurrencyAmount(valueTransactionData.source)},
      {name: 'Amount Burned', value: formatCurrencyAmount(valueTransactionData.destination)},
      {name: 'Gas Fee', value: `${valueTransactionData.gasUsed ? fromWei(valueTransactionData.gasUsed) : '0'} ETH`},
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
          transactionData={transactionData}
          status={valueTransactionData.status}
          explorerLink={`https://etherscan.io/tx/${valueTransactionData.transactionHash}`}
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
                setCurrentNetwork(undefined);
              } else if (newStep === 2) {
                // Cant go
              } else {
                // Cant go
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

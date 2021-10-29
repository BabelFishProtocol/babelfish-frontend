import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Steps} from '../../components/steps';
import {Card, CardTitled, TransactionCard} from '../../lib/components';
import {ChainGroup} from '../../components/SelectChain';
import {chainEnum} from "../../config/Chains";
import type {EthLiveTransaction} from "../../web3/service";
import {EthTransaction, formatCurrencyAmount, fromWei} from "../../web3/service";
import {DepositContent} from './styles';
import {SendDeposit} from "./steps/sendDeposit";

const STEPS = [
  'Select Deposit Network',
  'Deposit to Babelfish',
  'Minting Process',
  'Minting Complete',
];

export const Deposit = () => {
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
    content = <SendDeposit network={valueCurrentNetwork} onSubmit={setLiveTransaction}/>;
  } else {
    const transactionData = [
      {name: 'Date/Time', value: moment(valueTransactionData.detectedAt).format('DD/MM/YY')},
      {name: 'Amount Sent', value: formatCurrencyAmount(valueTransactionData.source)},
      {name: 'Amount Minted', value: formatCurrencyAmount(valueTransactionData.destination)},
      {name: 'Gas Fee', value: `${valueTransactionData.gasUsed ? fromWei(valueTransactionData.gasUsed) : '0'} ETH`},
      // {
      //   name: 'ETH Deposit',
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
          title={`DEPOSIT TO BABELFISH ${
            valueCurrentNetwork ? `FROM ${valueCurrentNetwork}` : ''
          }`}>
          <div className="h-100 position-relative">
            <DepositContent>
              {content}
            </DepositContent>
          </div>
        </CardTitled>
      </div>
    </div>
  );
};

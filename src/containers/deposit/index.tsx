import React, {useEffect, useState} from 'react';
import {Steps} from '../../components/steps';
import {Card, CardTitled, TransactionCard} from '../../lib/components';
import {ChainGroup} from '../../components/SelectChain';
import {chainEnum, trxExplorerLink} from "../../config/Chains";
import {DepositContent} from './styles';
import {SendDeposit} from "./steps/sendDeposit";
import BN from "bn.js";
import {
  EthLiveTransaction,
  EthTransaction,
  formatCurrencyAmount,
  formatDate
} from "../../utils/themes/ethLiveTransaction";

const STEPS = [
  'Select Deposit Network',
  'Deposit to Babelfish',
  'Approving Process',
  'Approving Complete',
  'Minting Process',
  'Minting Complete',
];

export const Deposit = () => {
  const [valueCurrentNetwork, setCurrentNetwork] = useState<chainEnum | undefined>(undefined);
  const [valueLiveApproveTransaction, setLiveApproveTransaction] = useState<EthLiveTransaction | undefined>(undefined);
  const [valueLiveMintTransaction, setLiveMintTransaction] = useState<EthLiveTransaction | undefined>(undefined);
  const [valueApproveTransactionData, setApproveTransactionData] = useState<EthTransaction | undefined>(undefined);
  const [valueMintTransactionData, setMintTransactionData] = useState<EthTransaction | undefined>(undefined);
  useEffect(
    () => {
      if (valueLiveApproveTransaction) {
        valueLiveApproveTransaction.on('receipt', setApproveTransactionData);
        valueLiveApproveTransaction.on(
          'success',
          (dd: any) => {
            setApproveTransactionData(dd);
            setLiveMintTransaction(valueLiveApproveTransaction.getNext() || undefined);
            valueLiveApproveTransaction.offAll();
          }
        );
        valueLiveApproveTransaction.on(
          'fail',
          (dd: any) => {
            setApproveTransactionData(dd);
            valueLiveApproveTransaction.offAll();
          },
        );
        return () => valueLiveApproveTransaction.offAll();
      }
    },
    [valueLiveApproveTransaction, setApproveTransactionData],
  );
  useEffect(
    () => {
      if (valueLiveMintTransaction) {
        valueLiveMintTransaction.on('receipt', setMintTransactionData);
        valueLiveMintTransaction.on('success', setMintTransactionData);
        valueLiveMintTransaction.on('fail', setMintTransactionData);
        return () => valueLiveMintTransaction.offAll();
      }
    },
    [valueLiveMintTransaction, setMintTransactionData],
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
  } else {
    if (!valueMintTransactionData) {
      if (!valueApproveTransactionData) {
        currentStep = 1;
        content = <SendDeposit network={valueCurrentNetwork} onSubmit={setLiveApproveTransaction}/>;
      } else {
        content = (
          <div className="d-flex justify-content-center">
            <TransactionCard
              processName="approval"
              transactionData={[
                {name: 'Date/Time', value: formatDate(valueApproveTransactionData.detectedAt)},
                {name: 'Amount Sent', value: formatCurrencyAmount(valueApproveTransactionData.source)},
                {name: 'Amount Minted', value: formatCurrencyAmount(valueApproveTransactionData.destination)},
                {name: 'Gas Fee', value: `${formatCurrencyAmount({currency: 'ETH', amount: new BN(valueApproveTransactionData?.gasUsed || 0)})}`},
                // {
                //   name: 'ETH Deposit',
                //   value: <Link>0X413.89054</Link>,
                // },
                // {
                //   name: 'RSK Relay Hash',
                //   value: <Link>0X413.89054</Link>,
                // },
              ]}
              status={valueApproveTransactionData.status}
              explorerLink={trxExplorerLink(valueCurrentNetwork, valueApproveTransactionData.transactionHash)}
              explorerName="see on explorer"
            />
          </div>
        );
        currentStep = valueApproveTransactionData.status === 'pending' ? 2 : 3;
      }
    } else {
      content = (
        <div className="d-flex justify-content-center">
          <TransactionCard
            processName="minting"
            transactionData={[
              {name: 'Date/Time', value: formatDate(valueMintTransactionData.detectedAt)},
              {name: 'Amount Sent', value: formatCurrencyAmount(valueMintTransactionData.source)},
              {name: 'Amount Minted', value: formatCurrencyAmount(valueMintTransactionData.destination)},
              {name: 'Gas Fee', value: `${formatCurrencyAmount({currency: 'ETH', amount: new BN(valueMintTransactionData?.gasUsed || 0)})}`},
              // {
              //   name: 'ETH Deposit',
              //   value: <Link>0X413.89054</Link>,
              // },
              // {
              //   name: 'RSK Relay Hash',
              //   value: <Link>0X413.89054</Link>,
              // },
            ]}
            status={valueMintTransactionData.status}
            explorerLink={trxExplorerLink(valueCurrentNetwork, valueMintTransactionData.transactionHash)}
            explorerName="explorer"
          />
        </div>
      );
      currentStep = valueMintTransactionData.status === 'pending' ? 4 : 5;
    }
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
                setMintTransactionData(undefined);
                setApproveTransactionData(undefined);
              } else if (newStep === 1) {
                setMintTransactionData(undefined);
                setApproveTransactionData(undefined);
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

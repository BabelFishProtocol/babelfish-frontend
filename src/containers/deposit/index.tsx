import React, {useState} from 'react';
import {Steps} from '../../components/steps';
import {
  ButtonPrimary,
  Card,
  CardTitled,
  CurrencyInput,
  TransactionCard,
} from '../../lib/components';
import {DepositContent} from './styles';
import {SendDeposit} from './steps/sendDeposit';
import {ChainGroup} from '../../components/SelectChain';

export const Deposit = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = [
    'Select Deposit Network',
    'Deposit to sovryn',
    'Minting Process',
    'Minting Complete',
  ];
  const transactionData = [{name: 'eth', value: '200'}];
  return (
    <div className="row g-3 align-items-start h-100">
      <div className="col-12 col-md-5 col-lg-4 col-xl-3 m-0 h-100">
        <Card className="py-3 h-100">
          <Steps
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </Card>
      </div>
      <div className="col-12 col-md-7 col-lg-8 col-xl-9 m-0 h-100">
        <CardTitled title="Deposit to BabelFish from ETH Network">
          <div className="h-100 position-relative">
            <DepositContent>
              {
                {
                  0: <ChainGroup />,
                  1: <SendDeposit />,
                  2: <TransactionCard transactionData={transactionData} />,
                }[currentStep]
              }
            </DepositContent>
          </div>
        </CardTitled>
      </div>
    </div>
  );
};

import React, {useState} from 'react';
import {Steps} from '../../components/steps';
import {
  ButtonPrimary,
  Card,
  CardTitled,
  CurrencyInput,
} from '../../lib/components';
import InputButtonPillGroup from '../../lib/components/Input/inputButtonPillGroup';
import {BigNumber} from 'bignumber.js';
import {Dropdown} from '../../lib/components/Dropdown';
import {tokens} from '../../config/Tokens';
import {DepositContent, InputSubtext, InputTitle} from './styles';

export const Deposit = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = [
    'Select Deposit Network',
    'Deposit to sovryn',
    'Minting Process',
    'Minting Complete',
  ];

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
              <div className="row px-5 py-4 justify-content-between">
                <div className="col-5">
                  <InputTitle>Deposit Token</InputTitle>
                  <Dropdown name="Select Token" items={tokens} />
                  <InputSubtext>Available Balance: 1000.00 USDT</InputSubtext>
                </div>
                <div className="col-5">
                  <InputTitle>Receive Amount</InputTitle>
                  <CurrencyInput
                    currencyText="XUSD"
                    value={new BigNumber(0)}
                    onChange={() => console.log('object')}
                  />
                  <InputSubtext>Transaction fee: XXXXX</InputSubtext>
                </div>
              </div>
              <div className="row px-5 py-4 justify-content-between">
                <div className="col-5">
                  <InputTitle>Deposit Amount</InputTitle>
                  <InputButtonPillGroup
                    currency="USDT"
                    totalAmount={new BigNumber(100)}
                    availablePercentValues={[10, 25, 50, 75, 100]}
                    defaultValue={new BigNumber(10)}
                  />
                </div>
                <div className="col-5">
                  <ButtonPrimary style={{marginTop: '30px'}} className="w-100">
                    Deposit
                  </ButtonPrimary>
                </div>
              </div>
            </DepositContent>
          </div>
        </CardTitled>
      </div>
    </div>
  );
};

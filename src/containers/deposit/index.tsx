import React, {useState} from 'react';
import {Steps} from '../../components/steps';
import {Card, CardTitled} from '../../lib/components';
import InputButtonPillGroup from '../../lib/components/Input/inputButtonPillGroup';
import {BigNumber} from 'bignumber.js';

export const Deposit = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = [
    'Select Deposit Network',
    'Deposit to sovryn',
    'Minting Process',
    'Minting Complete',
  ];

  const availablePercentValues = [10, 15, 30, 60, 100];
  const totalAmount = new BigNumber(150);
  const title = 'Deposit Amount';
  const currency = 'USTD';

  return (
    <div className="row g-3 m-0">
      <div className="col-3 m-0">
        <div className="pb-1">
          <Card className="py-3 d-flex flex-column">
            <Steps
              steps={steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </Card>
        </div>
      </div>
      <div className="col-9 m-0">
        <CardTitled title="Example">
          <InputButtonPillGroup
            availablePercentValues={availablePercentValues}
            totalAmount={totalAmount}
            title={title}
            currency={currency}
            defaultValue={new BigNumber(0.0)}
          />
        </CardTitled>
      </div>
    </div>
  );
};

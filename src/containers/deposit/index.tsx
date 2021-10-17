import React, {useState} from 'react';
import {Steps} from '../../components/steps';
import {
  Card,
  CardTitled,
  TransactionCard,
} from '../../lib/components';
import {DepositContent, Link} from './styles';
import {SendDeposit} from './steps/sendDeposit';
import {ChainGroup} from '../../components/SelectChain';
import {chainEnum} from "../../config/Chains";

export const Deposit = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentNetwork, setCurrentNetwork] = useState<chainEnum | undefined>(undefined);
  const steps = [
    'Select Deposit Network',
    'Deposit to Babelfish',
    'Minting Process',
    'Minting Complete',
  ];
  const transactionData = [
    {name: 'Date/Time', value: '21/01/21'},
    {name: 'Amount Sent', value: '50.00 USDT'},
    {name: 'Amount Minted', value: '50.00 XUSD'},
    {name: 'Gas Fee', value: 'XX ETH'},
    {
      name: 'ETH Deposit',
      value: <Link>0X413.89054</Link>,
    },
    {
      name: 'RSK Relay Hash',
      value: <Link>0X413.89054</Link>,
    },
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
        <CardTitled
          title={`DEPOSIT TO BABELFISH ${
            currentNetwork ? `FROM ${currentNetwork}` : ''
          }`}>
          <div className="h-100 position-relative">
            <DepositContent>
              {
                {
                  0: (
                    <ChainGroup
                      onChange={(name) => {
                        setCurrentNetwork(name);
                        setCurrentStep(currentStep + 1);
                      }}
                    />
                  ),
                  1: currentNetwork && <SendDeposit network={currentNetwork}/>,
                  2: (
                    <div className="d-flex justify-content-center">
                      <TransactionCard
                        transactionData={transactionData}
                        loading={true}
                      />
                    </div>
                  ),
                  3: (
                    <div className="d-flex justify-content-center">
                      <TransactionCard
                        transactionData={transactionData}
                        loading={false}
                        status="success"
                      />
                    </div>
                  ),
                }[currentStep]
              }
            </DepositContent>
          </div>
        </CardTitled>
      </div>
    </div>
  );
};

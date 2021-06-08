import React, {useState} from 'react';
import {Steps} from '../../components/steps';
import {
  ButtonPrimary,
  Card,
  CardTitled,
  CurrencyInput,
  TransactionCard,
} from '../../lib/components';
import InputButtonPillGroup from '../../lib/components/Input/inputButtonPillGroup';
import {BigNumber} from 'bignumber.js';
import {Dropdown} from '../../lib/components/Dropdown';
import {tokens} from '../../config/Tokens';
import {RedeemContent, InputSubtext, InputTitle} from './styles';
import {RedeemDeposit} from './steps/redeemDeposit';
import {ChainGroup} from '../../components/SelectChain';
import {Link} from '../deposit/styles';

export const Redeem = () => {
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = [
    'Select Redeem Network',
    'Redeem to sovryn',
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
        <CardTitled title="Redeem to BabelFish from ETH Network">
          <div className="h-100 position-relative">
            <RedeemContent>
              {
                {
                  0: <ChainGroup />,
                  1: <RedeemDeposit />,
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
            </RedeemContent>
          </div>
        </CardTitled>
      </div>
    </div>
  );
};

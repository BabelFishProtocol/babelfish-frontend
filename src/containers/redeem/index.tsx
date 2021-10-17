import React, {useState} from 'react';
import {Steps} from '../../components/steps';
import {Card, CardTitled, TransactionCard} from '../../lib/components';
import {RedeemContent, Link} from './styles';
import {ChainGroup} from '../../components/SelectChain';
import {RedeemBalance} from './steps/redeemBalance';
import {chainEnum} from "../../config/Chains";

export const Redeem = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentNetwork, setCurrentNetwork] = useState<chainEnum | undefined>(undefined);

  const steps = [
    'Select Redemption Network',
    'Withdraw from BabelFish',
    'Burning Process',
    'Burning Complete',
  ];
  const transactionData = [
    {name: 'Date/Time', value: '21/01/21'},
    {name: 'Withdraw Amount', value: '50.00 USDT'},
    {name: 'Amount Burned', value: '50.00 XUSD'},
    {name: 'Gas Fee', value: 'XX ETH'},
    {
      name: 'ETH Redeem',
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
          title={`REDEEM STABLECOINS OUT OF BABELFISH ${
            currentNetwork ? `TO ${currentNetwork}` : ''
          }`}>
          <div className="h-100 position-relative">
            <RedeemContent>
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
                  1: currentNetwork && <RedeemBalance network={currentNetwork} />,
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

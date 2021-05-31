import BigNumber from 'bignumber.js';
import React, {useState} from 'react';
import {Steps} from '../../components/steps';
import {AllTokensBar} from '../../components/TokenPercentage';
import {tokenEnum, tokens} from '../../config/Tokens';
import {Card, Table} from '../../lib/components';
import {Dropdown} from '../../lib/components/Dropdown';
import InputButtonPillGroup from '../../lib/components/Input/inputButtonPillGroup';
import {dataTable} from './table/data';

const steps = [
  'Select Deposit Network',
  'Deposit to sovryn',
  'Minting Process',
  'Minting Complete',
];

const columns = [
  {
    Header: 'Transactions',
    columns: [
      {
        Header: 'Event',
        accessor: 'event',
      },
      {
        Header: 'Asset',
        accessor: 'asset',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
  },
];

export const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="row g-3 align-items-start">
      <div className="col-12 col-md-5 col-lg-4 col-xl-3 m-0">
        <div>
          <Card className="py-3 d-flex flex-column">
            <Steps
              steps={steps}
              currentStep={currentStep}
              onStepChange={(index: number) => setCurrentStep(index)}
            />
          </Card>
        </div>
        <div className="mt-3">
          <Card className="py-3 px-3 d-flex flex-column">
            <AllTokensBar
              balances={[
                {id: tokenEnum.USDT, value: 75, totalValue: 100},
                {id: tokenEnum.USDC, value: 45, totalValue: 100},
                {id: tokenEnum.BUSD, value: 20, totalValue: 100},
                {id: tokenEnum.PAX, value: 90, totalValue: 100},
                {id: tokenEnum.DAI, value: 39, totalValue: 100},
              ]}
            />
          </Card>
        </div>
      </div>
      <div
        style={{height: 'fitContent'}}
        className="col-12 col-md-7 col-lg-8 col-xl-9 m-0">
        <Card className="p-4 mb-3">
          <div className="row justify-content-between">
            <div className="col-5">
              <Dropdown name="Select Token" items={tokens} />
            </div>
            <div className="col-5">
              <InputButtonPillGroup
                currency="USDT"
                totalAmount={new BigNumber(150)}
                defaultValue={new BigNumber(0.0)}
                availablePercentValues={[10, 15, 30, 60, 100]}
              />
            </div>
          </div>
        </Card>
        <Card>
          <Table columns={columns} data={dataTable} />
        </Card>
      </div>
    </div>
  );
};

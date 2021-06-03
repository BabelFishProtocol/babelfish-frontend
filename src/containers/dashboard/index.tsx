import BigNumber from 'bignumber.js';
import React, {useState} from 'react';
import {ChainGroup} from '../../components/SelectChain';
import {Steps} from '../../components/steps';
import {AllTokensBar} from '../../components/TokenPercentage';
import {tokenEnum, tokens} from '../../config/Tokens';
import {Card, Table} from '../../lib/components';
import {Banner} from '../../lib/components/Banner';
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
      </div>
      <div className="col-12 col-md-7 col-lg-8 col-xl-9 m-0">
        <Card className="p-4 mb-3">
          <div className="d-flex justify-content-center">
            <ChainGroup />
          </div>
        </Card>
        <Card>
          <Table columns={columns} data={dataTable} />
        </Card>
      </div>
    </div>
  );
};

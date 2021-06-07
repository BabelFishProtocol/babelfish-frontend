import React, {useState} from 'react';
import {CoinsDeposited} from '../../components/CoinsDeposited';
import {ChainGroup} from '../../components/SelectChain';
import {Steps} from '../../components/steps';
import {Card, Table} from '../../lib/components';
import {CardFishBalance, CardUsdBalance} from './styles';
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
        <div className="row mb-3 g-3">
          <div className="col-6">
            <CardFishBalance className="px-2 py-3">
              <span>Total Fish Rewarded</span>
              <h2>200,000 FISH</h2>
            </CardFishBalance>
          </div>
          <div className="col-6">
            <CardFishBalance className="px-2 py-3">
              <span>Earned Fish Today</span>
              <h2>100,000 FISH</h2>
            </CardFishBalance>
          </div>
        </div>

        <Card className="px-2 py-4 mb-3">
          <div className="d-flex justify-content-center">
            <CoinsDeposited />
          </div>
        </Card>

        <CardUsdBalance className="mb-3 p-3">
          Total #USD Balance: <span>100,000.00</span>
        </CardUsdBalance>

        <Card>
          <Table columns={columns} data={dataTable} />
        </Card>
      </div>
    </div>
  );
};

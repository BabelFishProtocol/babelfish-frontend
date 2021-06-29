import React, {useState} from 'react';
import {AddStake} from '../../../components/AddStake';
import {Table} from '../../../lib/components';
import {Popup} from '../../../lib/components/Popup';
import {
  AddStakeButton,
  CardBalances,
  CardTable,
  StakingDashboardContainer,
} from './styles';

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
        Header: 'Action',
        accessor: 'action',
      },
    ],
  },
];

export const StakingDashboard = () => {
  const [showAddStake, setShowAddStake] = useState<Boolean>(false);
  return (
    <>
      {showAddStake && <AddStake onClose={() => setShowAddStake(false)} />}
      <StakingDashboardContainer>
        <AddStakeButton
          className="mb-3"
          onClick={() => setShowAddStake(!showAddStake)}>
          Add Stake
        </AddStakeButton>

        <div className="row g-3 mb-3 p-0">
          <div className="col-4">
            <CardBalances className="px-2 py-3">
              <span>Total Staked</span>
              <h2>200,000 FISH</h2>
            </CardBalances>
          </div>
          <div className="col-4">
            <CardBalances className="px-2 py-3">
              <span>Total Earned Fees Available</span>
              <h2>100,000 USD</h2>
            </CardBalances>
          </div>
          <div className="col-4">
            <CardBalances className="px-2 py-3">
              <span>Combined Voting Power</span>
              <h2>100,000 PW</h2>
            </CardBalances>
          </div>
        </div>
        <CardTable className="mb-3">
          <Table columns={columns} data={[]} />
        </CardTable>
        <CardTable className="mb-3">
          <Table columns={columns} data={[]} />
        </CardTable>
        <CardTable className="mb-3">
          <Table columns={columns} data={[]} />
        </CardTable>
      </StakingDashboardContainer>
    </>
  );
};

import React from 'react';
import {useHistory} from 'react-router-dom';
import {ButtonPrimary, ButtonSecondary} from '../../lib/components';
import {
  CardDepositRedeem,
  CardFishBalance,
  CardUsdBalance,
  DashboardContainer,
  DashboardRightContainer,
  FlexCard,
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
        Header: 'Status',
        accessor: 'status',
      },
    ],
  },
];

export const Dashboard = () => {
  const history = useHistory();
  return (
    <DashboardContainer className="row g-3 align-items-start">
      <div className="col-12 col-md-5 col-lg-4 col-xl-3 m-0 h-100">
        <CardDepositRedeem className="px-3 py-4">
          <span className="mb-3">You can deposit or redeem anytime</span>
          <ButtonPrimary
            className="w-100 mb-3"
            onClick={() =>
              history.push(`${process.env.REACT_APP_BASE_PATH}/deposit`)
            }
          >
            Deposit
          </ButtonPrimary>
          <ButtonSecondary
            className="w-100"
            onClick={() =>
              history.push(`${process.env.REACT_APP_BASE_PATH}/redeem`)
            }
          >
            Redeem
          </ButtonSecondary>
        </CardDepositRedeem>
      </div>
      <DashboardRightContainer className="col-12 col-md-7 col-lg-8 col-xl-9 m-0 h-100">
        <div className="row mb-3 g-3">
          <div className="col-6">
            <CardFishBalance className="px-2 py-3">
              <span>Total Fish Rewarded</span>
              <h2>0 FISH</h2>
            </CardFishBalance>
          </div>
          <div className="col-6">
            <CardFishBalance className="px-2 py-3">
              <span>Earned Fish Today</span>
              <h2>0 FISH</h2>
            </CardFishBalance>
          </div>
        </div>

        {/* <FlexCard className="px-2 py-4 mb-3">
          <div className="d-flex justify-content-center">
            <CoinsDeposited />
          </div>
        </FlexCard> */}

        <CardUsdBalance className="mb-3 p-3">
          Total #USD Balance: <span>0</span>
        </CardUsdBalance>
      </DashboardRightContainer>
    </DashboardContainer>
  );
};

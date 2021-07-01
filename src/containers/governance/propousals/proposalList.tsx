import React, {useEffect, useState} from 'react';
import {
  CardTitled,
  Table,
} from '../../../lib/components';
import {TableCard, ViewProposalSpan} from '../styles';
import {useWeb3Context} from '../../../web3/context';
import {listProposals} from '../../../web3/service';
import {PropousalsTitle, StakeDashboard} from './styles';
import {useHistory} from 'react-router-dom';

const columns = [
  {
    Header: 'Governance Proposals',
    columns: [
      {
        Header: 'Proposal',
        accessor: 'id',
      },
      {
        Header: 'Start Block',
        accessor: 'startBlock',
      },
      {
        Header: 'Vote Weight',
        accessor: 'voteWeight',
      },
      {
        Header: 'Voting Ends',
        accessor: 'votingEnds',
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
    ],
  },
];

interface IProposalListProps {
  setProposal: any;
}

export const ProposalList = ({setProposal}: IProposalListProps) => {
  const history = useHistory();
  const {
    state: {web3},
  } = useWeb3Context();
  const [valueProposals, setProposals] = useState<any[]>([]);
  useEffect(() => {
    if (!web3) {
      return;
    }
    listProposals(web3).then(setProposals);
  }, [web3]);
  return (
    <CardTitled
      title={
        <PropousalsTitle>
          <span>BabelFish Bitocracy</span>
          <StakeDashboard
            onClick={() => history.push('/governance/staking')}>
            Stake Dashboard
          </StakeDashboard>
        </PropousalsTitle>
      }>
      <div className="p-4">
        <TableCard>
          <Table
            columns={columns}
            data={valueProposals.map((data) => {
              return {
                ...data,
                action: (
                  <ViewProposalSpan onClick={() => setProposal(1)}>
                    View Proposal
                  </ViewProposalSpan>
                ),
              };
            })}
          />
        </TableCard>
      </div>
    </CardTitled>
  );
};

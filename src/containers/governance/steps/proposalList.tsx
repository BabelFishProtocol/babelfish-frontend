import React from 'react';
import {
  ButtonSecondary,
  Card,
  CardTitled,
  Table,
} from '../../../lib/components';
import {dataTable} from '../../dashboard/table/data';
import {TableCard, ViewProposalSpan} from '../styles';
import {listData} from './listData';

const columns = [
  {
    Header: 'Governance Proposals',
    columns: [
      {
        Header: 'Proposal',
        accessor: 'proposal',
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
  return (
    <CardTitled title="BabelFish Bitocracy">
      <div className="p-4">
        <TableCard>
          <Table
            columns={columns}
            data={listData.map((data) => {
              return {
                ...data,
                action: (
                  <ViewProposalSpan onClick={() => setProposal(1)}>
                    View Proposal
                  </ViewProposalSpan>
                ),
              };
            })}></Table>
        </TableCard>
        <div className="d-flex justify-content-center py-4">
          <ButtonSecondary>Create Proposal</ButtonSecondary>
        </div>
      </div>
    </CardTitled>
  );
};

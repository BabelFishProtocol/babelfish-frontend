import React, {useEffect, useState} from 'react';
import {
  ButtonSecondary,
  Card,
  CardTitled,
  Table,
} from '../../../lib/components';
import {dataTable} from '../../dashboard/table/data';
import {TableCard, ViewProposalSpan} from '../styles';
import {listData} from './listData';
import {useWeb3Context} from "../../../web3/context";
import {listProposals} from "../../../web3/service";

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
  const {
    state: {web3},
  } = useWeb3Context();
  const [valueProposals, setProposals] = useState<any[]>([]);
  useEffect(
    () => {
      if (!web3) {
        return;
      }
      listProposals(web3).then(setProposals);
    },
    [web3]
  );
  return (
    <CardTitled title="BabelFish Bitocracy">
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
            })}/>
        </TableCard>
        <div className="d-flex justify-content-center py-4">
          <ButtonSecondary>Create Proposal</ButtonSecondary>
        </div>
      </div>
    </CardTitled>
  );
};

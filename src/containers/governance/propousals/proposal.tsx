import React from 'react';
import {VotingBar} from '../../../components/VotingBar';
import {ButtonPrimary, Card, CardTitled, Table} from '../../../lib/components';
import {
  BackButton,
  BarText,
  SolidCard,
  TableCard,
  TextCard,
  VoteAgainst,
  VoteButton,
  VoteFor,
  VotingEnd,
} from '../styles';

const columns = {
  columns: [
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Tx Hash',
      accessor: 'txHash',
    },
    {
      Header: 'Votes',
      accessor: 'votes',
    },
  ],
};

interface IProposalProps {
  onBack: any;
}

export const Proposal = ({onBack}: IProposalProps) => {
  const back = '<';
  return (
    <CardTitled
      title={
        <div className="d-flex justify-content-between align-items-center">
          <span>
            <BackButton onClick={() => onBack()}>{back}</BackButton>
            004SIP-0018: BabelFish
          </span>
          <VotingEnd>Voting Ends 05/14/2021</VotingEnd>
        </div>
      }>
      <div className="p-4">
        <div className="d-flex align-items-center">
          <BarText>50%</BarText>
          <VotingBar />
          <BarText>50%</BarText>
        </div>
        <div className="row py-3">
          <div className="col-6 d-flex">
            <SolidCard>48,980K VOTES FOR</SolidCard>
            <VoteFor>VOTE FOR THIS</VoteFor>
          </div>
          <div className="col-6 d-flex">
            <SolidCard>48,980K VOTES AGAINST</SolidCard>
            <VoteAgainst>VOTE AGAINST</VoteAgainst>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <TableCard>
              <Table columns={[{...columns, Header: 'Voted For'}]} data={[]} />
            </TableCard>
          </div>
          <div className="col-6">
            <TableCard>
              <Table
                columns={[{...columns, Header: 'Voted Against'}]}
                data={[]}
              />
            </TableCard>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-6">
            <TextCard className="p-3">
              SIP-0018: BabelFish Token Sale via Origins, Details:
              https://github.com/DistributedCollective/SIPS/blob/f8a726d/SIP-0018.md,
              sha256: 76q876fdh23984723985349827
              <br />
              <br />
              <br />
              Function to invoke: symbol () 0X00
              <br />
              Contract Address: <span>76q876fdh23984723985349827</span>
            </TextCard>
          </div>
          <div className="col-6">
            <TextCard className="p-3">
              Proposed by: 0x27D5—7752
              <br />
              <br />
              Proposed on: 5/13/2021, 12:56PM <span>#3347624</span>
              <br />
              <br />
              Deadline: 5/13/2021, 12:56PM <span>#3347624</span>
              <br />
              <br />
              Proposal ID: <span>004</span>
            </TextCard>
          </div>
        </div>
      </div>
    </CardTitled>
  );
};

import React, {useState} from 'react';
import {ButtonSecondary, Card, CardTitled, Table} from '../../lib/components';
import {Proposal} from './propousals/proposal';
import {ProposalList} from './propousals/proposalList';

export const Governance = () => {
  const [proposal, setProposal] = useState(0);
  return (
    <>
      {proposal === 0 ? (
        <ProposalList setProposal={(proposal: any) => setProposal(proposal)} />
      ) : (
        <Proposal onBack={() => setProposal(0)} />
      )}
    </>
  );
};

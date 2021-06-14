import {VoteStatus} from '../styles';

export const listData = [
  {
    proposal: '005SIP-0018: Babel...',
    startBlock: '#3347625',
    voteWeight: (
      <div className="d-flex align-items-center">
        <VoteStatus status={true} /> Active
      </div>
    ),
    votingEnds: '03/10/21, 12:57pm',
  },
];

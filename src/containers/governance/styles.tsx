import styled from 'styled-components';
import {Card} from '../../lib/components';
import {ButtonStyled} from '../../lib/components/Button/styles';

export const ViewProposalSpan = styled.span`
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const VoteStatus = styled.div<{status: boolean}>`
  margin-right: 10px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status ? props.theme.primary : '#ef0512'};
`;

export const VotingEnd = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

export const BackButton = styled.span`
  color: white;
  font-size: 30px;
  padding: 0 10px;
  cursor: pointer;
`;

export const VoteButton = styled(ButtonStyled)`
  display: flex;
  width: 200px;
  margin-left: 10px;
  height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  font-weight: normal;
`;

export const VoteFor = styled(VoteButton)`
  color: #32f05f;
  border: solid 2px #32f05f;
  background-color: rgba(50, 240, 95, 0.1);
`;

export const VoteAgainst = styled(VoteButton)`
  color: #ef0512;
  border: solid 2px #ef0512;
  background-color: rgb(150 0 8 / 30%);
`;

export const BarText = styled.span`
  font-size: 28px;
  padding: 0 10px;
`;

export const SolidCard = styled(Card)`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
`;

export const TableCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
`;

export const TextCard = styled(Card)`
  height: fit-content;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  span {
    color: ${(props) => props.theme.primary};
  }
`;

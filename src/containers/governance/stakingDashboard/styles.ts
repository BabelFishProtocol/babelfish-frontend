import styled from 'styled-components';
import {ButtonSecondary} from '../../../lib/components';
import {CardStyled} from '../../../lib/components/Card/styles';

export const StakingDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const AddStakeButton = styled(ButtonSecondary)`
  width: fit-content;
  height: fit-content;
  padding: 13px 20px;
  margin-left: auto;
`;

export const CardTable = styled(CardStyled)`
  height: fit-content;
  flex: 1 1 auto;
`;

export const CardBalances = styled(CardStyled)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  span {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
  h2 {
    margin: 0;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
`;

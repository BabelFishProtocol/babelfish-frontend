import styled from 'styled-components';
import {CardStyled} from '../../lib/components/Card/styles';

export const CardDepositRedeem = styled(CardStyled)`
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  span {
    width: 75%;
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
`;

export const CardUsdBalance = styled(CardStyled)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px ${(props) => props.theme.primary};
  span {
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #ffffff;
  }
`;

export const CardFishBalance = styled(CardStyled)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

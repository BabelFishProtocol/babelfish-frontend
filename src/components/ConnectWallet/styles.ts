import styled from 'styled-components';
import {ButtonStyled} from '../../lib/components/Button/styles';
import {CardStyled} from '../../lib/components/Card/styles';

export const ConnectedButton = styled(ButtonStyled)`
  border: solid 2px rgba(255, 255, 255, 0.3);
  background-color: transparent;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

export const ConnectWalletContainer = styled.div`
  margin-left: 10px;
  position: relative;
  width: fit-content;
  height: fit-content;
`;

export const WalletPopUp = styled(CardStyled)`
  padding: 15px;
  width: fit-content;
  height: fit-content;
  position: absolute;
  bottom: 0;
  border-radius: 15px;
  right: 0;
  transform: translate(0%, calc(100% + 10px));
`;

export const WalletContainer = styled.div<{connected: boolean}>`
  cursor: pointer;
  height: 55px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.08);
  border: ${(props) =>
    props.connected
      ? '2px solid #32f05f91'
      : '2px solid rgba(255, 255, 255, 0.08)'};
  border-radius: 6px;
  transition: 0.3s;
  :hover {
    border: 2px solid #32f05f91;
  }
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const WalletIcon = styled.img`
  border-radius: 50%;
  padding: 2px;
  height: 35px;
  width: 35px;
  background: white;
  object-fit: contain;
`;

export const Info = styled.div`
  margin-top: 10px;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    cursor: pointer;
    color: ${(props) => props.theme.primary};
  }
`;

export const Icon = styled.img`
  height: 25px;
  width: 25px;
  object-fit: contain;
  margin-left: 10px;
`;

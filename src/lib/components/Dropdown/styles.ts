import styled from 'styled-components';
import arrow from '../../../resources/svgs/down-arrow.svg';

export const DropdownContainer = styled.div`
  position: relative;
  height: fit-content;
  /* border: solid 1px ${(props) => props.theme.primary}; */
`;

export const DropdownText = styled.div`
  height: 45px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  width: 100;
  border: solid 1px ${(props) => props.theme.primary};
  cursor: pointer;
  span {
    padding: 0 10px;
  }
  &:after {
    font-size: 14px;
    font-family: Roboto;
    content: url('${arrow}');
    position: absolute;
    right: 15px;
  }
`;

export const DropdownItemsGroup = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-top: none;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: solid 1px ${(props) => props.theme.primary};
  border-top: none;
  z-index: 100;
`;

export const DropdownItem = styled.div`
  height: 45px;
  position: relative;
  background: transparent;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 15px;
  &:hover {
    background: rgba(6, 143, 38, 0.2);
  }
  span {
    padding: 0 10px;
  }
`;

export const Icon = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  height: fit-content;
  /* border: solid 1px ${(props) => props.theme.primary}; */
`;

export const DropdownText = styled.div`
  height: 45px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  width: 100;
  border: solid 1px ${(props) => props.theme.primary};
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
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border: solid 1px ${(props) => props.theme.primary};
  border-top: none;
`;

export const DropdownItem = styled.div`
  height: 45px;
  position: relative;
  background: transparent;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(6, 143, 38, 0.2);
  }
`;

import styled from "styled-components";

export const StepRow = styled.div<{ active: boolean }>`
  position: relative;
  height: 40px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:after {
    content: "";
    background-color: ${(props) =>
      props.active ? props.theme.primary : "transparent"};
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
    transition: 0.3s;
  }
`;

export const StepNumber = styled.div<{ active: boolean }>`
  height: 24px;
  width: 24px;
  position: relative;
  background-color: transparent;
  color: ${(props) => (props.active ? "black" : "white")};
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: "";
    border: solid 1px;
    border-radius: 50%;
    border-color: ${(props) => (props.active ? props.theme.primary : "white")};
    background-color: ${(props) =>
      props.active ? props.theme.primary : "transparent"};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
    transition: 0.3s;
  }
`;

export const StepText = styled.span<{ active: boolean }>`
  margin-left: 10px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.13;
  letter-spacing: normal;
  color: ${(props) => (props.active ? props.theme.primary : "white")};
  z-index: 2;
`;

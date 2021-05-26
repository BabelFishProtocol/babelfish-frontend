import styled from "styled-components";
import { StepStatusType } from "./types";

export const StepRow = styled.div.attrs({})<{
  status: StepStatusType;
}>`
  position: relative;
  height: 35px;
  padding: 0 0 0 1rem;
  margin: 2.5px 0;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  &:before {
    content: "";
    background-color: ${(props) =>
      props.status === "active" ? props.theme.primary : "transparent"};
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

export const StepNumber = styled.div<{ status: StepStatusType }>`
  height: 22px;
  width: 22px;
  position: relative;
  color: ${(props) => (props.status === "none" ? "white" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px;
  border-radius: 50%;
  border-color: ${(props) =>
    props.status === "none" ? "white" : props.theme.primary};
  background-color: ${(props) =>
    props.status === "none" ? "transparent" : props.theme.primary};
  transition: 0.3s;
`;

export const StepText = styled.span<{ status: StepStatusType }>`
  margin-left: 10px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.13;
  letter-spacing: normal;
  color: ${(props) =>
    props.status === "none" ? "white" : props.theme.primary};
  z-index: 2;
  height: 35px;
  display: flex;
  align-items: center;
`;

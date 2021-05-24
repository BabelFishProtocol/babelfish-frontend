import styled from "styled-components";

export const ButtonStyled = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
`;

export const ButtonPrimary = styled(ButtonStyled)`
  background: ${(props) => props.theme.primary};
  font-size: 14px;
  color: #010101;
`;

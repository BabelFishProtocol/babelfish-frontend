import styled from "styled-components";

export const ButtonStyled = styled.button<{ color?: string }>`
  width: 100%;
  padding: 20px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  background-color: ${(props) => props.color};
`;

export const ButtonDefault = (props: any) => ButtonStyled({ ...props });

export const ButtonPrimary = (props: any) =>
  ButtonStyled({ ...props, color: props.theme.primary });

export const ButtonSecondary = (props: any) =>
  ButtonStyled({ ...props, color: props.theme.secondary });

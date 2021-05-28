import React from 'react';
import styled from 'styled-components';

export const ButtonStyled = styled.button<{color?: string}>`
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

export const ButtonDefault = (props: any) => <ButtonStyled {...props} />;

export const ButtonPrimary = (props: any) => (
  <ButtonStyled {...props} color={props.theme.primary} />
);

export const ButtonSecondary = (props: any) => (
  <ButtonStyled {...props} color={props.theme.secondary} />
);

export const ButtonPillStyled = styled.button<{selected?: string}>`
  min-width: 60px;
  border-radius: 12.5px;
  margin: 13px 5px 0 0;
  border: ${(props) =>
    props.selected ? 'solid 1px #32f05f' : 'solid 1px #979797'};
  background-color: ${(props) =>
    props.selected ? 'rgba(50, 240, 95, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
`;

export const ButtonPill = (props: any) => <ButtonPillStyled {...props} />;

export const TextStyled = styled.span`
  font-family: ArbelHagilda;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

export const TextButtonPill = (props: any) => <TextStyled {...props} />;

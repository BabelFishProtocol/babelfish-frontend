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

export const GroupButtonPillContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  button {
    margin-right: 5px;
    :last-child {
      margin-right: 0;
    }
  }
`;

export const ButtonPill = styled.button<{selected?: boolean}>`
  width: 60px;
  border-radius: 12.5px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(props) =>
    props.selected ? 'solid 1px #32f05f' : 'solid 1px #979797'};
  background-color: ${(props) =>
    props.selected ? 'rgba(50, 240, 95, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
`;

export const TextButtonPill = styled.span`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

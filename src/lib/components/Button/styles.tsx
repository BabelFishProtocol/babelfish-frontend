import React from 'react';
import styled from 'styled-components';

export const ButtonStyled = styled.button<{backgroundColor?: string}>`
  min-width: 100px;
  padding: 13px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  border: solid 2px ${(props) => props.theme.primary};
`;

export const ButtonDefault = (props: any) => <ButtonStyled {...props} />;

export const ButtonPrimary = styled(ButtonStyled)`
  background-color: ${(props) => props.theme.primary};
`;

export const ButtonSecondary = styled(ButtonStyled)`
  background-color: transparent;
  color: ${(props) => props.theme.primary};
`;

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

export const LinkStyled = styled.a<{backgroundColor?: string}>`
  min-width: 100px;
  padding: 13px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  border: solid 2px ${(props) => props.theme.primary};
  text-decoration: none;
  color: #000000;
  cursor: pointer;
`;

export const LinkPrimary = styled(LinkStyled)`
  background-color: ${(props) => props.theme.primary};
  &:hover {
    color: #000000;
  }
`;

export const LinkSecondary = styled(LinkStyled)`
  background-color: transparent;
  color: ${(props) => props.theme.primary};
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

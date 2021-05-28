import React from 'react';
import styled from 'styled-components';

export const TextStyled = styled.span`
  font-family: ArbelHagilda;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

export const TextDefault = (props: any) => <TextStyled {...props} />;

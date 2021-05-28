import React from 'react';
import styled from 'styled-components';

export const InputStyled = styled.input<{color?: string}>`
  padding: 19px 16px 17px 20px;
  border: solid 1px rgba(255, 255, 255, 0.6);
`;

export const InputDefault = (props: any) => <InputStyled {...props} />;

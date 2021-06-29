import styled from 'styled-components';

export const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 0;
`;

export const Amount = styled.h2`
  font-size: 28px;
  margin: 0;
  color: white;
  font-family: Roboto;
  font-weight: medium;
  &:after {
    content: 'PW';
    margin-left: 5px;
    font-weight: bold;
    color: grey;
  }
`;

export const Title = styled.span`
  font-size: 14px;
  padding: 20px 0;
`;

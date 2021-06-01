import MaskedInput from 'react-text-mask';
import styled from 'styled-components';

export const InputMaskedContainer = styled.div`
  height: 45px;
  display: flex;
  width: 100%;
  padding: 15px 15px 14px 20px;
  border: solid 1px ${(props) => props.theme.primary};
  align-items: center;
`;

export const InputMaskedStyled = styled(MaskedInput)<{disabled?: boolean}>`
  border: none;
  background-color: transparent;
  &:focus,
  &:focus-visible {
    outline: none;
  }
  padding: 0;
  color: #ffffff;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.24 : 0.6)};
`;

export const InputTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
`;

const TextStyled = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  span {
    font-size: 16px;
    color: #ffffff;
  }
`;

export const CurrencyLabel = (props: any) => (
  <TextStyled {...props}>
    <span>{props.children}</span>
  </TextStyled>
);

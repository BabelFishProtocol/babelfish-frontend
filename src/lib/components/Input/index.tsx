import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {BigNumber} from 'bignumber.js';
import {
  InputMaskedContainer,
  InputMaskedStyled,
  CurrencyLabel,
  InputTitle,
} from './styles';

const numberMask = createNumberMask({
  prefix: '',
  suffix: ' $',
  allowDecimal: true,
  decimalLimit: 2,
});

interface IInputProps {
  onChange: Function;
  value: BigNumber;
  currencyText: string;
  title?: string;
  disabled?: boolean;
}

export const CurrencyInput = (props: IInputProps) => {
  const handleChange = (inputValue: string) => {
    const newValue = inputValue && inputValue.replace(/[, \\$]/g, '');
    const parseValue = newValue ? new BigNumber(newValue): new BigNumber('0');
    props.onChange(parseValue || null);
  };
  return (
    <>
      {props.title && <InputTitle>{props.title}</InputTitle>}
      <InputMaskedContainer>
        <InputMaskedStyled
          mask={numberMask}
          value={props.value ? props.value?.toFixed(2) : ''}
          disabled={props.disabled}
          onChange={(e) => handleChange(e.target.value)}
        />
        <CurrencyLabel>{props.currencyText}</CurrencyLabel>
      </InputMaskedContainer>
    </>
  );
};

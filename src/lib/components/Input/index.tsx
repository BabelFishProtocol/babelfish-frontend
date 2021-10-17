import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import BN from 'bn.js';
import {
  InputMaskedContainer,
  InputMaskedStyled,
  CurrencyLabel,
  InputTitle,
} from './styles';
import Web3 from "web3";

const numberMask = createNumberMask({
  prefix: '',
  suffix: ' $',
  allowDecimal: true,
  decimalLimit: 25,
});

interface IInputProps {
  onChange?: (a: BN | null) => void;
  value: BN | null;
  currencyText: string;
  title?: string;
  disabled?: boolean;
}

export const CurrencyInput = ({title, currencyText, onChange, value, ...props}: IInputProps) => {
  const handleChange = (inputValue: string) => {
    const newValue = inputValue && inputValue.replace(/[, \\$]/g, '');
    const parseValue = new BN(newValue ? Web3.utils.toWei(newValue) : 0);
    onChange && onChange(parseValue || null);
  };
  return (
    <>
      {title && <InputTitle>{title}</InputTitle>}
      <InputMaskedContainer>
        <InputMaskedStyled
          {...props}
          mask={numberMask}
          value={value ? Web3.utils.fromWei(value).toString() : ''}
          onChange={onChange ? (e) => handleChange(e.target.value) : undefined}
        />
        <CurrencyLabel>{currencyText}</CurrencyLabel>
      </InputMaskedContainer>
    </>
  );
};

import React, {useState} from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {
  InputMaskedContainer,
  InputMaskedStyled,
  CurrencyLabel,
  InputTitle,
} from './styles';

const numberMask = createNumberMask({
  prefix: '',
  suffix: ' $', // This will put the dollar sign at the end, with a space.
});

interface IInputProps {
  onChange: Function;
  value: number | null;
  currencyText: string;
  title?: string;
  disabled?: boolean;
}

export const CurrencyInput = (props: IInputProps) => {
  const handleChange = (value: string) => {
    const newValue = value && value.replace(/,/g, '');
    props.onChange(newValue ? parseFloat(newValue) : null);
  };
  return (
    <>
      {props.title && <InputTitle>{props.title}</InputTitle>}
      <InputMaskedContainer>
        <InputMaskedStyled
          mask={numberMask}
          value={props.value ? props.value?.toFixed() : ''}
          disabled={props.disabled}
          onChange={(e) => handleChange(e.target.value)}
        />
        <CurrencyLabel>{props.currencyText}</CurrencyLabel>
      </InputMaskedContainer>
    </>
  );
};

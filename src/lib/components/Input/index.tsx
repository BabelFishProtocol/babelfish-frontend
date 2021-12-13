import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import BN from 'bn.js';
import {
  InputMaskedContainer,
  InputMaskedStyled,
  CurrencyLabel,
  InputTitle,
} from './styles';
import Web3 from 'web3';

interface IInputProps {
  onChange?: (a: BN | null) => void;
  value: BN | null;
  currencyText: string;
  title?: string;
  decimalLimit?: number;
  disabled?: boolean;
}

function isPartialValid(inn: string): boolean {
  return /^\d*\.?\d*$/.test(inn);
}

function isValid(inn: string): boolean {
  return /^\d+(\.\d+)?$/.test(inn);
}

export const CurrencyInput = ({onChange, value, ...props}: IInputProps) => {
  // ToDo: Use from wei?
  const [valueTmp, setTmp] = React.useState<string>(
    value ? Web3.utils.fromWei(value).toString() : '',
  );
  React.useEffect(() => {
    const newValue = valueTmp && valueTmp.replace(/[, \\$_]/g, '');
    if (isValid(newValue)) {
      const parseValue = new BN(newValue ? Web3.utils.toWei(newValue) : 0);
      onChange && onChange(parseValue || null);
    }
  }, [valueTmp, onChange]);
  React.useEffect(() => {
    setTmp(value ? Web3.utils.fromWei(value).toString() : '');
  }, [value, setTmp]);
  const onChangeCb = React.useCallback(
    (e: any) => {
      const newValue =
        e.target.value && e.target.value.replace(/[, \\$_]/g, '');
      isPartialValid(newValue) && setTmp(newValue);
    },
    [setTmp],
  );
  return (
    <AmountInputUncontrolled
      value={valueTmp}
      onChange={onChangeCb}
      {...props}
    />
  );
};

export const CurrencyInputUncontrolled = ({value, ...props}: any) => {
  return (
    <AmountInputUncontrolled
      value={value ? Web3.utils.fromWei(value).toString() : ''}
      {...props}
    />
  );
};

const AmountInputUncontrolled = ({
  title,
  currencyText,
  onChange,
  value,
  decimalLimit,
  ...props
}: any) => {
  const numberMask = React.useMemo(
    () =>
      createNumberMask({
        prefix: '$ ',
        suffix: '',
        allowDecimal: true,
        decimalLimit: decimalLimit || 18,
      }),
    [],
  );
  return (
    <>
      {title && <InputTitle>{title}</InputTitle>}
      <InputMaskedContainer>
        <InputMaskedStyled
          {...props}
          mask={numberMask}
          onChange={onChange}
          value={value}
        />
        <CurrencyLabel>{currencyText}</CurrencyLabel>
      </InputMaskedContainer>
    </>
  );
};

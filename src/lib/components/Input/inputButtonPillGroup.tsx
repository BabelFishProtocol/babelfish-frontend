import BN from 'bn.js';
import React, {useState} from 'react';
import ButtonPillGroup from '../Button/buttonPillGroup';
import {CurrencyInput} from './';

interface IInputButtonPillGroupProps {
  title?: string;
  currency: string;
  totalAmount: BN;
  availablePercentValues: number[];
  defaultValue: BN;
  value: BN | null;
  onChange?: (a: BN | null) => void;
}

const InputButtonPillGroup = (props: IInputButtonPillGroupProps) => {
  const [percentSelected, setPercentSelected] = useState<number | null>(null);
  const {totalAmount, availablePercentValues, currency, value, onChange, ...inputProps} = props;
  return (
    <div>
      <div>
        <CurrencyInput
          {...inputProps}
          title={props.title}
          onChange={(value) => {
            setPercentSelected(null);
            onChange && onChange(value);
          }}
          value={value}
          currencyText={currency}
        />
        <ButtonPillGroup
          availableValues={availablePercentValues}
          selected={percentSelected}
          onChangeSelected={(percent: number) => {
            setPercentSelected(percent);
            if (percent) {
              onChange && onChange(totalAmount.mul(new BN(percent)).div(new BN(100)));
            }
          }}
        />
      </div>
    </div>
  );
};

export default InputButtonPillGroup;

import BN from 'bn.js';
import React, {useState, useCallback} from 'react';
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
  const {totalAmount, availablePercentValues, currency, value, onChange, ...inputProps} = props;
  const [percentSelected, setPercentSelected] = useState<number | null>(null);
  const onChangeIn = useCallback(
    (value) => {
      setPercentSelected(null);
      onChange && onChange(value);
    },
    [setPercentSelected, onChange],
  );
  return (
    <div>
      <div>
        <CurrencyInput
          {...inputProps}
          title={props.title}
          onChange={onChangeIn}
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

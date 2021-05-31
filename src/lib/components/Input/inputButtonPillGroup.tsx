import BigNumber from 'bignumber.js';
import React, {useState} from 'react';
import ButtonPillGroup from '../Button/buttonPillGroup';
import {CurrencyInput} from './';

interface IInputButtonPillGroupProps {
  title?: string;
  currency: string;
  totalAmount: BigNumber;
  availablePercentValues: number[];
  defaultValue: BigNumber;
}

const InputButtonPillGroup = (props: IInputButtonPillGroupProps) => {
  const [inputValue, setInputValue] = useState<BigNumber>(props.defaultValue);
  const [percentSelected, setPercentSelected] = useState<number | null>(null);
  const {totalAmount, availablePercentValues, currency, ...inputProps} = props;
  return (
    <div className="d-flex">
      <div className="flex-column d-flex" style={{flex: 1}}>
        <CurrencyInput
          {...inputProps}
          title={props.title}
          onChange={(value: BigNumber) => {
            setPercentSelected(null);
            setInputValue(value);
          }}
          value={inputValue}
          currencyText={currency}
        />
        <ButtonPillGroup
          availableValues={availablePercentValues}
          selected={percentSelected}
          onChangeSelected={(percent: number) => {
            setPercentSelected(percent);
            if (percent) {
              setInputValue(totalAmount.times(percent).dividedBy(100));
            }
          }}
        />
      </div>
    </div>
  );
};

export default InputButtonPillGroup;

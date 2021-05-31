import React, {useState} from 'react';
import ButtonPillGroup from '../Button/buttonPillGroup';
import {CurrencyInput} from './';

interface IInputButtonPillGroupProps {
  title: string;
  currency: string;
  amount: number;
  availablePercentValues: number[];
  disabled?: boolean;
}

const InputButtonPillGroup = (props: IInputButtonPillGroupProps) => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [percentSelected, setPercentSelected] = useState<number | null>(null);
  return (
    <div className="d-flex">
      <div className="flex-column d-flex" style={{flex: 1}}>
        <CurrencyInput
          title={props.title}
          onChange={(value: number) => {
            setPercentSelected(null);
            setInputValue(value);
          }}
          value={inputValue}
          currencyText={props.currency}
          disabled={props.disabled}
        />
        <ButtonPillGroup
          availableValues={props.availablePercentValues}
          selected={percentSelected}
          onChangeSelected={(percent: number) => {
            setPercentSelected(percent);
            if (percent) {
              setInputValue((props.amount * percent) / 100);
            }
          }}
        />
      </div>
    </div>
  );
};

export default InputButtonPillGroup;

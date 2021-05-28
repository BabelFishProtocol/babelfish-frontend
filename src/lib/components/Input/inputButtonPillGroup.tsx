import React, {useState} from 'react';

import ButtonPillGroup from '../Button/buttonPillGroup';
import {Input} from '../../components/Input';

const availablePercentValues = [10, 15, 30, 60, 100];
const amount = 150;

const InputButtonPillGroup = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [percentSelected, setPercentSelected] = useState<number | null>(null);
  return (
    <div className="d-flex flex-column">
      <Input
        onChange={(value: number) => {
          setPercentSelected(null);
          setInputValue(value);
        }}
        value={inputValue}
      />
      <div>
        <ButtonPillGroup
          availableValues={availablePercentValues}
          selected={percentSelected}
          onChangeSelected={(percent: number) => {
            setPercentSelected(percent);
            if (percent) {
              setInputValue((amount * percent) / 100);
            }
          }}
        />
      </div>
    </div>
  );
};

export default InputButtonPillGroup;

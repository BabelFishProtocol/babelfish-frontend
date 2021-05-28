import React, {useState} from 'react';

import ButtonPillGroup from '../Button/buttonPillGroup';
import {Input} from '../../components/Input';
import {InputDefault} from '../../components/Input/styles';
import {TextDefault} from '../../components/Text/styles';

const availablePercentValues = [10, 15, 30, 60, 100];
const amount = 150;

const InputButtonPillGroup = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [percentSelected, setPercentSelected] = useState<number | null>(null);
  return (
    <div className="d-flex">
      <div className="flex-column d-flex">
        <div
          style={{
            display: 'flex',
            padding: '15px 15px 14px 20px',
            border: 'solid 1px rgba(255, 255, 255, 0.6)',
            alignItems: 'flex-end',
          }}>
          <Input
            onChange={(value: number) => {
              setPercentSelected(null);
              setInputValue(value);
            }}
            value={inputValue}
          />
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TextDefault>USTD</TextDefault>
          </div>
        </div>
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
    </div>
  );
};

export default InputButtonPillGroup;

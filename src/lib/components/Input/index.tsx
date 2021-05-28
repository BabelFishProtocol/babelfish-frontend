import React, {useState} from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';

const numberMask = createNumberMask({
  prefix: '',
  suffix: ' $', // This will put the dollar sign at the end, with a space.
});

interface IInputProps {
  onChange: Function;
  value: number | null;
}

export const Input = (props: IInputProps) => {
  const handleChange = (value: string) => {
    const newValue = value && value.replace(/,/g, '');
    props.onChange(newValue ? parseFloat(newValue) : null);
  };
  return (
    <MaskedInput
      mask={numberMask}
      value={props.value ? props.value?.toFixed() : ''}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

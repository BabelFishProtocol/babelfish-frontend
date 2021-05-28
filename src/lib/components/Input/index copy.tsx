import React, {useState} from 'react';

interface IInputProps {
  onChange: Function;
  value: number | null;
}

export const Input = (props: IInputProps) => {
  const handleChange = (value: string) => {
    props.onChange(value ? parseInt(value, 10) : null);
  };

  return (
    <input
      {...props}
      value={props.value ? props.value?.toFixed(2) : ''}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

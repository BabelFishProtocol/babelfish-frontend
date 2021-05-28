import React, {useState} from 'react';

interface IInputProps {
  placeholder?: string;
  onChange: Function;
  value: number | string;
}

export const Input = ({placeholder, onChange, value}: IInputProps) => {
  const handleChange = (e: any) => {
    const value = e.target.value;
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      onChange(value);
    }
  };

  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(text) => handleChange(text)}
    />
  );
};

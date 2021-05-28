import React from 'react';
import {ButtonPill} from './styles';

const ButtonPillGroup = ({
  selected,
  availableValues,
  onChangeSelected,
}: {
  selected: any;
  availableValues: any[];
  onChangeSelected: Function;
}) => (
  <>
    {availableValues.map((value) => (
      <ButtonPill
        key={value}
        selected={selected === value}
        onClick={() => onChangeSelected(selected !== value ? value : null)}>
        <span>{value} %</span>
      </ButtonPill>
    ))}
  </>
);
export default ButtonPillGroup;

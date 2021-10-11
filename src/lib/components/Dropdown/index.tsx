import React, {useState} from 'react';
import {Icon} from '../../../components/TokenPercentage/styles';
import {
  DropdownContainer,
  DropdownItem,
  DropdownItemsGroup,
  DropdownText,
} from './styles';

interface IDropdownProps<T> {
  placeholder?: string;
  items: T[];
  value: T | undefined,
  onChange: (tt: T | undefined) => void,
}

export default function Dropdown<T extends {icon?: string, name?: string, symbol: string}>({placeholder, items, value, onChange}: IDropdownProps<T>) {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  return (
    <DropdownContainer>
      <DropdownText onClick={() => setDisplayDropdown(!displayDropdown)}>
        {value ? (
          <>
            <Icon src={value.icon} /> <span>{value.name}</span>
          </>
        ) : (
          placeholder
        )}
      </DropdownText>
      {displayDropdown && (
        <DropdownItemsGroup>
          {items.map((item: any) => (
            <DropdownItem
              onClick={() => {
                onChange(item);
                setDisplayDropdown(false);
              }}>
              <Icon src={item.icon || `https://via.placeholder.com/150?text=${item.symbol}`} />
              <span>{item.name || item.symbol}</span>
            </DropdownItem>
          ))}
        </DropdownItemsGroup>
      )}
    </DropdownContainer>
  );
}

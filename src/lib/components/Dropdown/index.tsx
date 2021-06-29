import React, {useState} from 'react';
import {Icon} from '../../../components/TokenPercentage/styles';
import {
  DropdownContainer,
  DropdownItem,
  DropdownItemsGroup,
  DropdownText,
} from './styles';

interface IDropdownProps {
  placeholder: string;
  items: {}[];
}

export const Dropdown = ({placeholder, items}: IDropdownProps) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState() as any;
  return (
    <DropdownContainer>
      <DropdownText onClick={() => setDisplayDropdown(!displayDropdown)}>
        {selectedItem ? (
          <>
            <Icon src={selectedItem.icon} />{' '}
            <span style={{color: 'white'}}>{selectedItem.name}</span>
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
                setSelectedItem(item);
                setDisplayDropdown(false);
              }}>
              <Icon src={item.icon} />
              <span>{item.name}</span>
            </DropdownItem>
          ))}
        </DropdownItemsGroup>
      )}
    </DropdownContainer>
  );
};

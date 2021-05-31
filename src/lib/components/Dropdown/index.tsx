import React, { useState } from "react";
import {
  DropdownContainer,
  DropdownItem,
  DropdownItemsGroup,
  DropdownText,
} from "./styles";

interface IDropdownProps {
  name: string;

  items: {}[];
}

export const Dropdown = ({ name, items }: IDropdownProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <DropdownContainer>
      <DropdownText>{name}</DropdownText>
      {selected && (
        <DropdownItemsGroup>
          {items.map((item: any) => (
            <DropdownItem>{item.name}</DropdownItem>
          ))}
        </DropdownItemsGroup>
      )}
    </DropdownContainer>
  );
};

import React from 'react';
import {CrossIcon} from '../../../resources/svgs/cross';
import {Background, Close, PopupContainer} from './styles';

interface IPopupProps {
  children: React.ReactNode;
  onClose: any;
}

export const Popup = ({children, onClose}: IPopupProps) => {
  return (
    <Background>
      <PopupContainer className="py-4 px-3">
        <Close onClick={() => onClose()}>
          <CrossIcon fill="white" size="10" />
        </Close>
        {children}
      </PopupContainer>
    </Background>
  );
};

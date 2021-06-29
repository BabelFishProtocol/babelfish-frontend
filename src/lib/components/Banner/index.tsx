import React from 'react';
import {CrossIcon} from '../../../resources/svgs/cross';
import {BannerContainer, Close} from './styles';

interface IBannerProps {
  onClose: any;
  children: React.ReactNode;
}

export const Banner = ({onClose, children}: IBannerProps) => {
  return (
    <BannerContainer>
      <span>{children}</span>
      <Close onClick={() => onClose()}>
        <CrossIcon />
      </Close>
    </BannerContainer>
  );
};

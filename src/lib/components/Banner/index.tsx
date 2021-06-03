import React from 'react';
import closeIcon from '../../../resources/svgs/cross.svg';
import {BannerContainer, Close} from './styles';

interface IBannerProps {
  onClose: any;
  children: React.ReactNode;
}

export const Banner = ({onClose, children}: IBannerProps) => {
  return (
    <BannerContainer>
      <span>{children}</span>
      <Close src={closeIcon} onClick={() => onClose()} />
    </BannerContainer>
  );
};

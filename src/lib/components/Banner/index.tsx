import React from 'react';
import closeIcon from '../../../resources/svgs/cross.svg';
import {BannerContainer, Close} from './styles';

interface IBannerProps {
  children: React.ReactNode;
}

export const Banner = ({children}: IBannerProps) => {
  return (
    <BannerContainer>
      {children}
      <Close src={closeIcon} />
    </BannerContainer>
  );
};

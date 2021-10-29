import React from 'react';
import mined from '../../../resources/svgs/mined.svg';
import mining from '../../../resources/svgs/mining.svg';

interface ICircleWave {
  isLoading: boolean;
}

export const CircleWave = ({isLoading}: ICircleWave) => {
  return (
    <div
      style={{
        marginBottom: '20px',
        width: '80px',
        height: '80px',
        backgroundColor: !isLoading ? '#32f05f' : 'transparent',
        backgroundImage: `url(${isLoading ? mining : mined})`,
        backgroundSize: '110%',
        backgroundPosition: 'center',
        borderRadius: '50%',
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: !isLoading ? '#32f05f' : 'white',
      }}
    />
  );
};

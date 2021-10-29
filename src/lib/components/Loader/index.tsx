import React from 'react';

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
        background: !isLoading ? '#32f05f' : 'transparent',
        borderRadius: '50%',
        border: !isLoading ? '3px solid#32f05f' : '3px solid white',
      }}
    />
  );
};

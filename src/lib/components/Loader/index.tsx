import React from 'react';

interface ICircleWave {
  loading: boolean;
  status: 'success' | 'failed' | 'unknown';
}

export const CircleWave = ({loading, status}: ICircleWave) => {
  return (
    <div
      style={{
        marginBottom: '20px',
        width: '80px',
        height: '80px',
        background: status === 'success' ? '#32f05f' : 'transparent',
        borderRadius: '50%',
        border: status === 'success' ? '3px solid#32f05f' : '3px solid white',
      }}></div>
  );
};

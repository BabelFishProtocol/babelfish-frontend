import React from 'react';
import mined from '../../../resources/svgs/mined.svg';
import mining from '../../../resources/svgs/mining.svg';
import minedFailed from '../../../resources/svgs/mined-failed.svg';
import {EthTransactionStatus} from "../../../web3/service";

interface ICircleWave {
  status: EthTransactionStatus;
}

const Loader = ({status}: ICircleWave) => {
  let bgImage;
  let backgroundColor;
  let borderColor;
  if (status === 'success') {
    backgroundColor = 'transparent';
    bgImage = mined;
    borderColor = backgroundColor;
  } else if (status === 'pending') {
    backgroundColor = 'transparent';
    bgImage = mining;
    borderColor = '#32f05f';
  } else {
    backgroundColor = 'transparent';
    bgImage = minedFailed;
    borderColor = '#ef0512';
  }
  return (
    <div
      style={{
        marginBottom: '20px',
        width: '80px',
        height: '80px',
        backgroundColor,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '110%',
        backgroundPosition: 'center',
        borderRadius: '50%',
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor,
      }}
    />
  );
};

export default Loader;

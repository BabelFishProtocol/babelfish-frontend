import BigNumber from 'bignumber.js';
import React from 'react';
import {tokens} from '../../../config/Tokens';
import {ButtonPrimary, CurrencyInput} from '../../../lib/components';
import {Dropdown} from '../../../lib/components/Dropdown';
import InputButtonPillGroup from '../../../lib/components/Input/inputButtonPillGroup';
import {InputSubtext, InputTitle} from '../styles';

export const SendDeposit = () => {
  return (
    <>
      <div className="row px-5 py-4 justify-content-between">
        <div className="col-5">
          <InputTitle>Deposit Token</InputTitle>
          <Dropdown name="Select Token" items={tokens} />
          <InputSubtext>Available Balance: 1000.00 USDT</InputSubtext>
        </div>
        <div className="col-5">
          <InputTitle>Receive Amount</InputTitle>
          <CurrencyInput
            currencyText="XUSD"
            value={new BigNumber(0)}
            onChange={() => console.log('object')}
          />
          <InputSubtext>Transaction fee: XXXXX</InputSubtext>
        </div>
      </div>
      <div className="row px-5 py-4 justify-content-between">
        <div className="col-5">
          <InputTitle>Deposit Amount</InputTitle>
          <InputButtonPillGroup
            currency="USDT"
            totalAmount={new BigNumber(100)}
            availablePercentValues={[20, 40, 60, 80, 100]}
            defaultValue={new BigNumber(10)}
          />
        </div>
        <div className="col-5">
          <ButtonPrimary style={{marginTop: '30px'}} className="w-100">
            Deposit
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

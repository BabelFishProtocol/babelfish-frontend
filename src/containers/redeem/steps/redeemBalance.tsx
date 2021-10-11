import React, {useState} from 'react';
import {BigNumber} from 'bignumber.js';
import {tokens, tokenType} from '../../../config/Tokens';
import {ButtonPrimary, CurrencyInput} from '../../../lib/components';
import Dropdown from '../../../lib/components/Dropdown';
import InputButtonPillGroup from '../../../lib/components/Input/inputButtonPillGroup';
import {InputSubtext, InputTitle} from '../styles';
import {useWeb3Context} from "../../../web3/context";
import {redeem} from "../../../web3/service";

export const RedeemBalance = () => {
  const {
    state: {web3},
  } = useWeb3Context();
  const [valueSelectedToken, setSelectedToken] = useState<tokenType | undefined>(undefined);
  return (
    <>
      <div className="row px-5 py-2 justify-content-between">
        <div className="col-5">
          <InputTitle>Redeem Amount</InputTitle>
          <InputButtonPillGroup
            currency="USDT"
            totalAmount={new BigNumber(100)}
            availablePercentValues={[20, 40, 60, 80, 100]}
            defaultValue={new BigNumber(10)}
          />
          <InputSubtext>Available Balance: 1000.00 USDT</InputSubtext>
        </div>
        <div className="col-5">
          <InputTitle>Redeem Token</InputTitle>
          <Dropdown<tokenType> placeholder="Select Token" items={tokens} value={valueSelectedToken} onChange={setSelectedToken} />
          {valueSelectedToken && <InputSubtext>Available Balance: 1000.00 {valueSelectedToken.name || valueSelectedToken.symbol}</InputSubtext>}
        </div>
      </div>
      <div className="row px-5 py-2 justify-content-between">
        <div className="col-5"/>
        <div className="col-5">
          <InputTitle>Receive Amount</InputTitle>
          <CurrencyInput
            currencyText="XUSD"
            value={new BigNumber(0)}
            onChange={() => console.log('object')}
          />
          <InputSubtext>Transaction fee: XXXXX</InputSubtext>
          <ButtonPrimary style={{marginTop: '30px'}} className="w-100" onClick={
            () => {
              if (web3) {
                redeem(web3);
              }
            }
          }>
            Redeem
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

import BigNumber from 'bignumber.js';
import React, {useEffect, useState} from 'react';
import {tokenType, tokens} from '../../../config/Tokens';
import {ButtonPrimary, CurrencyInput} from '../../../lib/components';
import Dropdown from '../../../lib/components/Dropdown';
import InputButtonPillGroup from '../../../lib/components/Input/inputButtonPillGroup';
import {InputSubtext, InputTitle} from '../styles';
import {chainEnum} from "../../../config/Chains";
import {getTokenBalance} from "../../../web3/service";
import {useWeb3Context} from "../../../web3/context";

export const SendDeposit = ({network}: {network: chainEnum}) => {
  const [valueSelectedToken, setSelectedToken] = useState<tokenType | undefined>(undefined);
  const [valueAvailableTokenBalance, setAvailableTokenBalance] = useState<number | undefined>(undefined);
  const {
    state: {web3},
  } = useWeb3Context();
  useEffect(
    () => {
      if (!web3 || !valueSelectedToken) {
        return;
      }
      getTokenBalance(web3, valueSelectedToken.address).then(
        setAvailableTokenBalance
      );
    },
    [web3, valueSelectedToken, setAvailableTokenBalance],
  );
  return (
    <>
      <div className="row px-5 py-4 justify-content-between">
        <div className="col-5">
          <InputTitle>Deposit Token</InputTitle>
          <Dropdown<tokenType> placeholder="Select Token" items={tokens.filter(({networks}) => networks.includes(network))} value={valueSelectedToken} onChange={setSelectedToken}/>
          {valueSelectedToken && valueAvailableTokenBalance !== undefined && <InputSubtext>Available Balance: {valueAvailableTokenBalance.toFixed(2)} {valueSelectedToken.name || valueSelectedToken.symbol}</InputSubtext>}
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
            currency={valueSelectedToken?.name || valueSelectedToken?.symbol || ''}
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

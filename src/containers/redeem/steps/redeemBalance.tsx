import React, {useEffect, useState} from 'react';
import BN from 'bn.js';
import Web3 from 'web3';
import {tokenType} from '../../../config/Tokens';
import {ButtonPrimary, CurrencyInput} from '../../../lib/components';
import Dropdown from '../../../lib/components/Dropdown';
import InputButtonPillGroup from '../../../lib/components/Input/inputButtonPillGroup';
import {InputSubtext, InputTitle} from '../styles';
import {chainEnum} from "../../../config/Chains";
import {redeem, getTokenBalance} from '../../../web3/service';
import {useWeb3Context} from "../../../web3/context";

export const RedeemBalance = ({network}: {network: chainEnum}) => {
  const {
    state: {web3, bAssets},
  } = useWeb3Context();
  const [valueSelectedToken, setSelectedToken] = useState<tokenType | undefined>(undefined);
  const [valueAmount, setAmount] = useState<BN | null>(new BN(0));
  const [valueAvailableTokenBalance, setAvailableTokenBalance] = useState<BN | undefined>(undefined);
  const tokenOnNetwork = valueSelectedToken?.networks?.[network];
  useEffect(
    () => {
      if (!web3 || !valueSelectedToken) {
        return;
      }
      getTokenBalance(web3, valueSelectedToken.bridgedTo.address).then(
        setAvailableTokenBalance
      );
    },
    [web3, valueSelectedToken, setAvailableTokenBalance],
  );
  return (
    <>
      <div className="row px-5 py-2 justify-content-between">
        <div className="col-5">
          <InputTitle>Redeem Amount</InputTitle>
          <InputButtonPillGroup
            currency={valueSelectedToken?.bridgedTo.symbol || ''}
            totalAmount={new BN(valueAvailableTokenBalance|| 0)}
            availablePercentValues={[20, 40, 60, 80, 100]}
            defaultValue={new BN(10)}
            value={valueAmount}
            onChange={setAmount}
          />
          {valueSelectedToken && valueAvailableTokenBalance !== undefined && <InputSubtext>Available Balance: {Web3.utils.fromWei(valueAvailableTokenBalance).toString()} {valueSelectedToken.bridgedTo.symbol}</InputSubtext>}
        </div>
        <div className="col-5">
          <InputTitle>Redeem Token</InputTitle>
          <Dropdown<tokenType> placeholder="Select Token" items={bAssets.filter(({networks}) => networks[network] !== null)} value={valueSelectedToken} onChange={setSelectedToken} />
        </div>
      </div>
      <div className="row px-5 py-2 justify-content-between">
        <div className="col-5"/>
        <div className="col-5">
          <InputTitle>Receive Amount</InputTitle>
          <CurrencyInput
            currencyText={valueSelectedToken?.name || ''}
            value={valueAmount}
            disabled={true}
          />
          <InputSubtext>Transaction fee: 0</InputSubtext><br/>
          <InputSubtext>Bridge fee: 0</InputSubtext>
          <ButtonPrimary
            style={{marginTop: '30px'}}
            className="w-100"
            disabled={!(web3 && valueSelectedToken && valueAmount)}
            onClick={
              () => {
                if (web3 && tokenOnNetwork && valueSelectedToken && valueAmount) {
                  redeem(web3, tokenOnNetwork.address, valueAmount, valueSelectedToken.bridgedTo.id);
                }
              }
            }
          >
            Redeem
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

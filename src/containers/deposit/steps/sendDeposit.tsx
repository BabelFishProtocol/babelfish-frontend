import React, {useEffect, useState} from 'react';
import BN from 'bn.js';
import Web3 from 'web3';
import {tokenType} from '../../../config/Tokens';
import {ButtonPrimary, CurrencyInput} from '../../../lib/components';
import Dropdown from '../../../lib/components/Dropdown';
import InputButtonPillGroup from '../../../lib/components/Input/inputButtonPillGroup';
import {InputSubtext, InputTitle} from '../styles';
import {chainEnum} from "../../../config/Chains";
import {deposit, getTokenBalance} from '../../../web3/service';
import {useWeb3Context} from "../../../web3/context";

export const SendDeposit = ({network}: {network: chainEnum}) => {
  const {
    state: {web3, bAssets},
  } = useWeb3Context();
  const [valueSelectedToken, setSelectedToken] = useState<tokenType | undefined>(undefined);
  const [valueAmount, setAmount] = useState<BN | null>(new BN(0));
  const [valueAvailableTokenBalance, setAvailableTokenBalance] = useState<BN | undefined>(undefined);
  const tokenOnNetwork = valueSelectedToken?.networks?.[network];
  useEffect(
    () => {
      if (!web3 || !tokenOnNetwork) {
        return;
      }
      getTokenBalance(web3, tokenOnNetwork.address).then(
        setAvailableTokenBalance
      );
    },
    [web3, tokenOnNetwork, setAvailableTokenBalance],
  );
  return (
    <>
      <div className="row px-5 py-4 justify-content-between">
        <div className="col-5">
          <InputTitle>Deposit Token</InputTitle>
          <Dropdown<tokenType> placeholder="Select Token" items={bAssets.filter(({networks}) => networks[network] !== null)} value={valueSelectedToken} onChange={setSelectedToken}/>
          {valueSelectedToken && valueAvailableTokenBalance !== undefined && <InputSubtext>Available Balance: {Web3.utils.fromWei(valueAvailableTokenBalance).toString()} {valueSelectedToken.name}</InputSubtext>}
        </div>
        <div className="col-5">
          <InputTitle>Receive Amount</InputTitle>
          <CurrencyInput
            currencyText={valueSelectedToken?.bridgedTo.symbol || ''}
            value={valueAmount}
            disabled={true}
          />
          <InputSubtext>Transaction fee: XXXXX</InputSubtext>
        </div>
      </div>
      <div className="row px-5 py-4 justify-content-between">
        <div className="col-5">
          <InputTitle>Deposit Amount</InputTitle>
          <InputButtonPillGroup
            currency={valueSelectedToken?.name || ''}
            totalAmount={new BN(valueAvailableTokenBalance|| 0)}
            availablePercentValues={[20, 40, 60, 80, 100]}
            defaultValue={new BN(10)}
            value={valueAmount}
            onChange={setAmount}
          />
        </div>
        <div className="col-5">
          <ButtonPrimary
            style={{marginTop: '30px'}}
            className="w-100"
            disabled={!(web3 && tokenOnNetwork && valueAmount)}
            onClick={
              () => {
                if (web3 && tokenOnNetwork && valueSelectedToken && valueAmount) {
                  deposit(web3, tokenOnNetwork.address, valueAmount, valueSelectedToken.bridgedTo.id);
                }
              }
            }
          >
            Deposit
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

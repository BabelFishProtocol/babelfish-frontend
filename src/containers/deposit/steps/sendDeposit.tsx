import React, {useEffect, useState} from 'react';
import BN from 'bn.js';
import {tokenType} from '../../../config/Tokens';
import {ButtonPrimary, CurrencyInputUncontrolled} from '../../../lib/components';
import Dropdown from '../../../lib/components/Dropdown';
import InputButtonPillGroup from '../../../lib/components/Input/inputButtonPillGroup';
import {InputSubtext, InputTitle} from '../styles';
import {chainEnum} from "../../../config/Chains";
import {
  deposit,
  getTokenBalance,
} from '../../../web3/service';
import {useWeb3Context} from "../../../web3/context";
import {EthLiveTransaction, formatCurrencyAmount} from "../../../utils/themes/ethLiveTransaction";

export const SendDeposit = ({network, onSubmit}: {network: chainEnum; onSubmit: (trx: EthLiveTransaction) => void}) => {
  const {
    state: {web3, bAssets},
  } = useWeb3Context();
  const [valueIsDoingAction, setIsDoingAction] = useState<boolean>(false);
  const [valueSelectedToken, setSelectedToken] = useState<tokenType | undefined>(undefined);
  const [valueAmount, setAmount] = useState<BN | null>(new BN(0));
  const [valueAvailableTokenBalance, setAvailableTokenBalance] = useState<BN | undefined>(undefined);
  const tokenOnNetwork = valueSelectedToken?.networks?.[network];
  useEffect(
    () => {
      if (!web3 || !tokenOnNetwork) {
        return;
      }
      getTokenBalance(web3, tokenOnNetwork.oAddress || tokenOnNetwork.address).then(
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
          <Dropdown<tokenType>
            placeholder="Select Token"
            items={bAssets.filter(({networks}) => networks[network] !== null)}
            value={valueSelectedToken}
            onChange={setSelectedToken}
          />
          {valueSelectedToken && tokenOnNetwork && valueAvailableTokenBalance !== undefined && (
            <InputSubtext>Available Balance: {formatCurrencyAmount({amount: valueAvailableTokenBalance, currency: valueSelectedToken.name, decimals: tokenOnNetwork.decimals})}</InputSubtext>
          )}
        </div>
        <div className="col-5">
          <InputTitle>Receive Amount</InputTitle>
          <CurrencyInputUncontrolled
            currencyText={valueSelectedToken?.bridgedTo.symbol || ''}
            value={valueAmount}
            disabled={true}
          />
          <InputSubtext>Transaction fee: 0</InputSubtext><br/>
          <InputSubtext>Bridge fee: 0</InputSubtext>
        </div>
      </div>
      <div className="row px-5 py-4 justify-content-between">
        <div className="col-5">
          <InputTitle>Deposit Amount</InputTitle>
          <InputButtonPillGroup
            currency={valueSelectedToken?.name || ''}
            totalAmount={new BN(valueAvailableTokenBalance|| 0)}
            // ToDo: Intentionally removed 100% option until implementing the 100% is FFFFFF option on a custom amount datatype
            availablePercentValues={[20, 40, 60, 80]}
            defaultValue={new BN(10)}
            value={valueAmount}
            onChange={setAmount}
          />
        </div>
        <div className="col-5">
          <ButtonPrimary
            style={{marginTop: '30px'}}
            className="w-100"
            disabled={!(web3 && tokenOnNetwork && valueAmount) || valueIsDoingAction}
            onClick={
              () => {
                if (web3 && tokenOnNetwork && valueSelectedToken && valueAmount) {
                  setIsDoingAction(true);
                  deposit(web3, network, valueSelectedToken, valueAmount).then(
                    onSubmit
                  ).catch().then(
                    () => {
                      setIsDoingAction(false);
                    }
                  );
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

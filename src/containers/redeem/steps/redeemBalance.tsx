import React, {useEffect, useState} from 'react';
import BN from 'bn.js';
import {tokenType} from '../../../config/Tokens';
import {
  ButtonPrimary,
  CurrencyInputUncontrolled,
} from '../../../lib/components';
import Dropdown from '../../../lib/components/Dropdown';
import InputButtonPillGroup from '../../../lib/components/Input/inputButtonPillGroup';
import {InputSubtext, InputTitle} from '../styles';
import {chainEnum, gasAsset} from '../../../config/Chains';
import {
  bridgeFees,
  getTokenBalance,
  redeem,
  redeemEstimateGas,
} from '../../../web3/service';
import {useWeb3Context} from '../../../web3/context';
import {
  EthLiveTransaction,
  formatCurrencyAmount,
} from '../../../utils/themes/ethLiveTransaction';

export const RedeemBalance = ({
  network,
  onSubmit,
}: {
  network: chainEnum;
  onSubmit: (trx: EthLiveTransaction) => void;
}) => {
  const {
    state: {web3, bAssets},
  } = useWeb3Context();
  const [valueIsDoingAction, setIsDoingAction] = useState<boolean>(false);
  const [valueSelectedToken, setSelectedToken] = useState<
    tokenType | undefined
  >(undefined);
  const [valueAmount, setAmount] = useState<BN | null>(new BN(0));
  const [valueAvailableTokenBalance, setAvailableTokenBalance] = useState<
    BN | undefined
  >(undefined);
  const [valueGasEstimate, setGasEstimate] = useState<BN | undefined>(
    undefined,
  );
  const [valueBridgeFee, setBridgeFee] = useState<BN | undefined>(undefined);
  const tokenOnNetwork = valueSelectedToken?.networks?.[network];
  useEffect(() => {
    if (!web3 || !valueSelectedToken) {
      return;
    }
    getTokenBalance(web3, valueSelectedToken.bridgedTo.address).then(
      setAvailableTokenBalance,
    );
  }, [web3, valueSelectedToken, setAvailableTokenBalance]);
  useEffect(() => {
    if (!web3 || !network || !valueSelectedToken || !valueAmount) {
      return;
    }
    redeemEstimateGas(web3, network, valueSelectedToken, valueAmount).then(
      setGasEstimate,
    );
  }, [web3, network, valueSelectedToken, setGasEstimate, valueAmount]);
  useEffect(() => {
    if (!web3 || !network) {
      return;
    }
    bridgeFees(web3, network, false).then(setBridgeFee);
  }, [web3, network, setBridgeFee]);

  return (
    <div className="w-100">
      <div className="row px-5 py-2 justify-content-between">
        <div className="col-5">
          <InputTitle>Redeem Amount</InputTitle>
          <InputButtonPillGroup
            currency={valueSelectedToken?.bridgedTo.symbol || ''}
            totalAmount={new BN(valueAvailableTokenBalance || 0)}
            // ToDo: Intentionally removed 100% option until implementing the 100% is FFFFFF option on a custom amount datatype
            availablePercentValues={[20, 40, 60, 80]}
            defaultValue={new BN(10)}
            value={valueAmount}
            onChange={setAmount}
          />
          {valueSelectedToken && valueAvailableTokenBalance !== undefined && (
            <InputSubtext>
              Available Balance:{' '}
              {formatCurrencyAmount({
                amount: valueAvailableTokenBalance,
                currency: valueSelectedToken.bridgedTo.symbol,
                decimals: 18,
              })}
            </InputSubtext>
          )}
        </div>
        <div className="col-5">
          <InputTitle>Redeem Token</InputTitle>
          <Dropdown<tokenType>
            placeholder="Select Token"
            items={bAssets.filter(({networks}) => networks[network] !== null)}
            value={valueSelectedToken}
            onChange={setSelectedToken}
          />
        </div>
      </div>
      <div className="row px-5 py-2 justify-content-between">
        <div className="col-5" />
        <div className="col-5">
          <InputTitle>Receive Amount</InputTitle>
          <CurrencyInputUncontrolled
            currencyText={valueSelectedToken?.name || ''}
            value={valueAmount}
            disabled={true}
          />
          <InputSubtext>
            Transaction fee:{' '}
            {valueGasEstimate &&
              valueSelectedToken &&
              formatCurrencyAmount({
                amount: valueGasEstimate,
                currency: gasAsset(chainEnum.RSK),
                decimals: 18,
              })}
          </InputSubtext>
          <br />
          <InputSubtext>
            Bridge fee:{' '}
            {valueBridgeFee &&
              valueSelectedToken &&
              formatCurrencyAmount({
                amount: valueBridgeFee,
                currency: valueSelectedToken.name,
                decimals: 18,
              })}
          </InputSubtext>
          <ButtonPrimary
            style={{marginTop: '30px'}}
            className="w-100"
            disabled={
              !(web3 && valueSelectedToken && valueAmount) || valueIsDoingAction
            }
            onClick={() => {
              if (web3 && tokenOnNetwork && valueSelectedToken && valueAmount) {
                setIsDoingAction(true);
                redeem(web3, network, valueSelectedToken, valueAmount)
                  .then(onSubmit)
                  .catch()
                  .then(() => {
                    setIsDoingAction(false);
                  });
              }
            }}
          >
            Redeem
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

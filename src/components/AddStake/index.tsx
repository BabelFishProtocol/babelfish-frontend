import React from 'react';
import {
  ButtonPrimary,
  ButtonSecondary,
  CurrencyInput,
} from '../../lib/components';
import {Popup} from '../../lib/components/Popup';
import {Amount, AmountContainer, Title} from './styles';
import BigNumber from 'bignumber.js';
import {Dropdown} from '../../lib/components/Dropdown';

interface IAddStakeProps {
  onClose: any;
}

export const AddStake = ({onClose}: IAddStakeProps) => {
  return (
    <Popup onClose={onClose}>
      <div className="mb-2">
        <Title>Voting Power Recived</Title>
        <AmountContainer>
          <Amount>0</Amount>
        </AmountContainer>
      </div>
      <div className="mb-4">
        <Title>Stake Amount</Title>
        <CurrencyInput
          currencyText="FISH"
          value={new BigNumber(0)}
          onChange={() => console.log('object')}
        />
      </div>
      <div className="mb-5">
        <Title>Select Date</Title>
        <div className="row g-2">
          <div className="col-5">
            <Dropdown placeholder="Select Year" items={[]} />
          </div>
          <div className="col-7">
            <Dropdown placeholder="Select Month/Day" items={[]} />
          </div>
        </div>
      </div>
      <ButtonPrimary className="w-100 mb-2">CONFIRM</ButtonPrimary>
      <ButtonSecondary className="w-100 mb-2">CANCEL</ButtonSecondary>
    </Popup>
  );
};

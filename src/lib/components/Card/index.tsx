import React from 'react';
import Loader from '../Loader';
import styled from 'styled-components';
import {
  CardStyled,
  LineBreak,
  TitledBody,
  TitledHeader,
  TransactionCardStyled,
  TransactionData,
  TransactionLoadingText,
} from './styles';
import {LinkPrimary} from '../Button/styles';
import {EthTransactionStatus} from '../../../utils/themes/ethLiveTransaction';

export const Card = CardStyled;

interface ICardTitledProps {
  title: any;
  children?: any;
}

const CardTitledContainer = styled(CardStyled)`
  display: flex;
  flex-direction: column;
`;

export const CardTitled = ({title, children}: ICardTitledProps) => {
  return (
    <CardTitledContainer>
      <TitledHeader className="px-4 py-3">{title}</TitledHeader>
      <LineBreak />
      <TitledBody>{children}</TitledBody>
    </CardTitledContainer>
  );
};

interface DisplayItem {
  name: string;
  value: any;
  style?: any;
}

interface ITransactionCardProps {
  processName: string;
  explorerLink: string;
  explorerName: string;
  transactionData: DisplayItem[];
  status: EthTransactionStatus;
}
//To Do move styles to styled component
export const TransactionCard = ({
  processName,
  explorerLink,
  transactionData,
  status = 'pending',
  explorerName,
}: ITransactionCardProps) => {
  let statusText;
  if (status === 'success') {
    statusText = null;
  } else if (status === 'pending') {
    statusText = (
      <TransactionLoadingText>
        {processName} can take a couple of minutes…
      </TransactionLoadingText>
    );
  } else {
    statusText = (
      <TransactionLoadingText>
        We encountered an error on the {processName} process,
        <br />
        please try again
      </TransactionLoadingText>
    );
  }
  return (
    <TransactionCardStyled>
      <div className="d-flex flex-column align-items-center px-4 py-5">
        <Loader status={status} />
        {statusText}

        <div id="transaction-data" className="row mt-2">
          <TransactionData className="col-6 text-right d-flex flex-column flex-wrap">
            {transactionData.map((element) => (
              <span className="left" key={element.name}>
                {element.name}:
              </span>
            ))}
          </TransactionData>
          <TransactionData className="col-6 text-left d-flex flex-column">
            {transactionData.map((element) => (
              <span style={element.style} key={element.name}>
                {element.value}
              </span>
            ))}
          </TransactionData>
        </div>
        <LinkPrimary className="mt-4" target="_blank" href={explorerLink}>
          view on {explorerName}
        </LinkPrimary>
      </div>
    </TransactionCardStyled>
  );
};

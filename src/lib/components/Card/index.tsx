import React from 'react';
import {ButtonPrimary} from '../Button';
import {CircleWave} from '../Loader';
import {
  CardStyled,
  LineBreak,
  TitledBody,
  TitledHeader,
  TransactionCardStyled,
  TransactionData,
  TransactionLoadingText,
} from './styles';

export const Card = CardStyled;

interface ICardTitledProps {
  title: string;
  children?: any;
}

export const CardTitled = ({title, children}: ICardTitledProps) => {
  return (
    <Card>
      <TitledHeader className="px-4 py-3">{title}</TitledHeader>
      <LineBreak />
      <TitledBody>{children}</TitledBody>
    </Card>
  );
};

interface ITransactionCardProps {
  transactionData: {name: string; value: any}[];
  loading?: boolean;
  status?: 'success' | 'failed' | 'unknown';
}
//To Do move styles to styled component
export const TransactionCard = ({
  transactionData,
  loading = false,
  status = 'unknown',
}: ITransactionCardProps) => {
  return (
    <TransactionCardStyled>
      <div className="d-flex flex-column align-items-center px-4 py-5">
        <CircleWave loading={loading} status={status} />
        {loading && (
          <TransactionLoadingText className="">
            Minting can take a couple of minutes…
          </TransactionLoadingText>
        )}

        <div id="transaction-data" className="row mt-2">
          <TransactionData className="col-6 text-right d-flex flex-column flex-wrap">
            {transactionData.map((element) => (
              <span
                className="left"
                key={`transactionTextRight-${element.name}`}>
                {element.name}:
              </span>
            ))}
          </TransactionData>
          <TransactionData className="col-6 text-left d-flex flex-column">
            {transactionData.map((element) => (
              <span key={`transactionTextLeft-${element.name}`}>
                {element.value}
              </span>
            ))}
          </TransactionData>
        </div>

        {!loading && (
          <ButtonPrimary className="mt-4" onClick={() => console.log('click')}>
            view on etherescan
          </ButtonPrimary>
        )}
      </div>
    </TransactionCardStyled>
  );
};

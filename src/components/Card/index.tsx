import React from "react";
import { Button } from "../Button";
import { CircleWave } from "../Loader";
import {
  CardStyled,
  LineBreak,
  TransactionCardStyled,
  TransactionLoadingText,
} from "./styles";

export const Card = () => {
  return <CardStyled></CardStyled>;
};

interface ICardTitle {
  title: string;
  children: any;
}

export const CardTitle = ({ title, children }: ICardTitle) => {
  return (
    <CardStyled>
      <div className="p-2">{title}</div>
      <LineBreak />
      <div className="p-2">{children}</div>
    </CardStyled>
  );
};

interface ITransactionCard {
  transactionData: any;
  loading: boolean;
  status?: "success" | "failed" | "unknown";
}

export const TransactionCard = ({
  transactionData,
  loading,
  status = "unknown",
}: ITransactionCard) => {
  return (
    <TransactionCardStyled>
      <div className="d-flex flex-column align-items-center p-4">
        <CircleWave loading={loading} status={status} />
        {loading && (
          <TransactionLoadingText className="my-2">
            Minting can take a couple of minutes…
          </TransactionLoadingText>
        )}

        <div id="transaction-data" className="row my-4">
          <div className="col-6 text-right">
            {Object.keys(transactionData).map((key) => (
              <span>{key}:</span>
            ))}
          </div>
          <div className="col-6 text-left">
            {Object.keys(transactionData).map((key) => (
              <span>{transactionData[key]}</span>
            ))}
          </div>
        </div>

        {loading && (
          <Button
            text="view on etherescan"
            onClick={() => console.log("click")}
          />
        )}
      </div>
    </TransactionCardStyled>
  );
};

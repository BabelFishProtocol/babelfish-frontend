import React from "react";
import { isPropertySignature } from "typescript";
import { CircleWave } from "../Loader";
import { CardStyled } from "./styles";

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
      {title}
      <div></div>
      {children}
    </CardStyled>
  );
};

interface ITransactionCard {
  transactionData: any;
  loading: boolean;
}

const transactionCardStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderImageSource:
    "linear-gradient(44deg, #232224 0%, #286b39 63%, #32f05f 99%)",
  borderImageSlice: "1",
};

export const TransactionCard = ({
  transactionData,
  loading,
}: ITransactionCard) => {
  return (
    <CardStyled
      style={transactionCardStyles}
      className="d-flex justify-content-center py-2 px-4"
    >
      <CircleWave loading={loading} />
      {loading && <span>Minting can take a couple of minutes…</span>}
      <div id="transaction-data" className="row">
        <div className="col-6 text-right">
          {Object.keys(transactionData).map((key) => (
            <span>{key}</span>
          ))}
        </div>
        <div className="col-6 text-left">
          {Object.keys(transactionData).map((key) => (
            <span>{transactionData[key]}</span>
          ))}
        </div>
      </div>
      {loading && <button>view on etherscan</button>}
    </CardStyled>
  );
};

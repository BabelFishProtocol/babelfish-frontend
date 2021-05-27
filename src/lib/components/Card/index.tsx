import React from "react";
import { ButtonPrimary } from "../Button";
import { CircleWave } from "../Loader";
import {
  CardStyled,
  LineBreak,
  TitledBody,
  TitledHeader,
  TransactionCardStyled,
  TransactionLoadingText,
} from "./styles";

interface ICardProps {
  children?: React.ReactNode;
  [x: string]: any;
}

export const Card = (props: ICardProps) => {
  const { children, ...rest } = props;
  return <CardStyled {...rest}>{children}</CardStyled>;
};

interface ICardTitledProps {
  title: string;
  children?: any;
}

export const CardTitled = ({ title, children }: ICardTitledProps) => {
  return (
    <CardStyled>
      <TitledHeader className="px-4 py-2">{title}</TitledHeader>
      <LineBreak />
      <TitledBody>{children}</TitledBody>
    </CardStyled>
  );
};

interface ITransactionCardProps {
  transactionData: { name: string; value: string }[];
  loading: boolean;
  status?: "success" | "failed" | "unknown";
}
//To Do move styles to styled component
export const TransactionCard = ({
  transactionData,
  loading,
  status = "unknown",
}: ITransactionCardProps) => {
  return (
    <TransactionCardStyled>
      <div className="d-flex flex-column align-items-center p-4">
        <CircleWave loading={loading} status={status} />
        {loading && (
          <TransactionLoadingText className="">
            Minting can take a couple of minutes…
          </TransactionLoadingText>
        )}

        <div id="transaction-data" className="row">
          <div className="col-6 text-right">
            {transactionData.map((element) => (
              <span key={`transactionTextRight-${element.name}`}>
                {element.name}:
              </span>
            ))}
          </div>
          <div className="col-6 text-left">
            {transactionData.map((element) => (
              <span key={`transactionTextLeft-${element.name}`}>
                {element.value}:
              </span>
            ))}
          </div>
        </div>

        {loading && (
          <ButtonPrimary
            text="view on etherescan"
            onClick={() => console.log("click")}
          />
        )}
      </div>
    </TransactionCardStyled>
  );
};
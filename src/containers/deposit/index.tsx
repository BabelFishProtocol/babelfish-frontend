import React from "react";
import { Card, CardTitle, TransactionCard } from "../../components";

export const Deposit = () => {
  return (
    <div className="container">
      <div className="row h-100">
        <div className="col-3">
          <Card></Card>
        </div>
        <div className="col-9 h-100">
          <CardTitle title="Example">
            <div className="w-50">
              <TransactionCard
                loading={true}
                transactionData={{ Date: "12/10/09" }}
              />
            </div>
          </CardTitle>
        </div>
      </div>
    </div>
  );
};

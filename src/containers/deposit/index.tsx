import React from "react";
import { Card, CardTitle, TransactionCard } from "../../components";

export const Deposit = () => {
  return (
    <div className="row g-3 m-0">
      <div className="col-3 m-0">
        <div className="pb-1" style={{ height: "40%" }}>
          <Card></Card>
        </div>
        <div className="pt-2" style={{ height: "60%" }}>
          <Card></Card>
        </div>
      </div>
      <div className="col-9 m-0">
        <CardTitle title="Example"></CardTitle>
      </div>
    </div>
  );
};

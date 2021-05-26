import React from "react";
import { Steps } from "../../components/steps";
import { Card, CardTitled, TransactionCard } from "../../lib/components";

export const Deposit = () => {
  const steps = [
    { text: "first", onClick: () => console.log("first") },
    { text: "first", onClick: () => console.log("first") },
    { text: "first", onClick: () => console.log("first") },
    { text: "first", onClick: () => console.log("first") },
    { text: "first", onClick: () => console.log("first") },
  ];
  return (
    <div className="row g-3 m-0">
      <div className="col-3 m-0">
        <div className="pb-1" style={{ height: "40%" }}>
          <Card className="py-2">
            <Steps steps={steps} />
          </Card>
        </div>
        <div className="pt-2" style={{ height: "60%" }}>
          <Card></Card>
        </div>
      </div>
      <div className="col-9 m-0">
        <CardTitled title="Example"></CardTitled>
      </div>
    </div>
  );
};

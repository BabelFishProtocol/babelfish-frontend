import React from "react";
import { Steps } from "../../components/steps";
import { Card, CardTitled, TransactionCard } from "../../lib/components";

export const Deposit = () => {
  const steps = [
    { text: "Select Deposit Network", onClick: () => console.log("first") },
    { text: "Deposit to sovryn", onClick: () => console.log("first") },
    { text: "Minting Process", onClick: () => console.log("first") },
    { text: "Minting Complete", onClick: () => console.log("first") },
  ];
  return (
    <div className="row g-3 m-0">
      <div className="col-3 m-0">
        <div className="pb-1">
          <Card className="py-3 d-flex flex-column">
            <Steps steps={steps} />
          </Card>
        </div>
      </div>
      <div className="col-9 m-0">
        <CardTitled title="Example"></CardTitled>
      </div>
    </div>
  );
};

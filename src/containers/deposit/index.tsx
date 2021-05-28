import React, { useState } from "react";
import { Steps } from "../../components/steps";
import { Card, CardTitled } from "../../lib/components";

export const Deposit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Select Deposit Network",
    "Deposit to sovryn",
    "Minting Process",
    "Minting Complete",
  ];
  return (
    <div className="row g-3 m-0">
      <div className="col-3 m-0">
        <div className="pb-1">
          <Card className="py-3 d-flex flex-column">
            <Steps
              steps={steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </Card>
        </div>
      </div>
      <div className="col-9 m-0">
        <CardTitled title="Example"></CardTitled>
      </div>
    </div>
  );
};

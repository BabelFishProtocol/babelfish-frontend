import React, { useState } from "react";
import { Steps } from "../../components/steps";
import { Card, CardTitled, Table } from "../../lib/components";
import tableColumns from "./table/columns.json";
import tableData from "./table/data.json";

export const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Select Deposit Network",
    "Deposit to sovryn",
    "Minting Process",
    "Minting Complete",
  ];
  return (
    <div className="row g-3 align-items-start">
      <div className="col-12 col-md-5 col-lg-4 col-xl-3 m-0">
        <div className="pb-1">
          <Card className="py-3 d-flex flex-column">
            <Steps
              steps={steps}
              currentStep={currentStep}
              onStepChange={(index: number) => setCurrentStep(index)}
            />
          </Card>
        </div>
      </div>
      <div
        style={{ height: "fitContent" }}
        className="col-12 col-md-7 col-lg-8 col-xl-9 m-0"
      >
        <Card>
          <Table columns={tableColumns} data={tableData} />
        </Card>
      </div>
    </div>
  );
};

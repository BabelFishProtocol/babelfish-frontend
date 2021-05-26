import React, { useState, useEffect } from "react";
import { Card } from "../../lib/components";
import { StepRow, StepNumber, StepText } from "./styles";

interface IStepsProps {
  steps: { text: string; onClick: any }[];
}

export const Steps = ({ steps }: IStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    console.log("object");
    steps[currentStep].onClick();
  }, [currentStep]);
  return (
    <>
      {steps.map((step, index) => {
        const isActive = currentStep === index ? true : false;
        return (
          <StepRow
            key={`step${index}`}
            active={isActive}
            onClick={() => setCurrentStep(index)}
          >
            <StepNumber active={isActive}>{index + 1}</StepNumber>
            <StepText active={isActive}>{step.text}</StepText>
          </StepRow>
        );
      })}
    </>
  );
};

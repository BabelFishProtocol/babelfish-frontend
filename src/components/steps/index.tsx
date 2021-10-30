import React from "react";
import { StepRow, StepNumber, StepText } from "./styles";
import { StepStatusType } from "./types";
import { CheckIcon } from "../../resources/svgs/check";

interface IStepsProps {
  steps: React.ReactNode[];
  onStepChange?: (step: number) => void;
  currentStep: number;
}

export const Steps = ({ steps, currentStep, onStepChange }: IStepsProps) => {
  return (
    <>
      {steps.map((step, index) => {
        let stepStatus: StepStatusType = "none";
        if (currentStep > index) {
          stepStatus = "done";
        } else if (currentStep === index) {
          stepStatus = "active";
        }
        return (
          <StepRow
            key={index}
            status={stepStatus}
            disabled={!onStepChange}
            onClick={() => onStepChange && onStepChange(index)}
          >
            <StepNumber status={stepStatus}>
              {stepStatus !== "done" ? index + 1 : <CheckIcon />}
            </StepNumber>
            <StepText status={stepStatus}>{step}</StepText>
          </StepRow>
        );
      })}
    </>
  );
};

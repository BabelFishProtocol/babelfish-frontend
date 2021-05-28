import React from "react";
import { Bar } from "./styles";

interface IProgressBarProps {
  value: number;
  totalValue: number;
}

export const ProgressBar = ({ value, totalValue }: IProgressBarProps) => {
  const percentage = (value * 100) / totalValue;
  return <Bar percentage={percentage} />;
};

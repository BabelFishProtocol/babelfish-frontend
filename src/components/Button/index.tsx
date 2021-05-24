import React from "react";
import { ButtonPrimary } from "./styles";

interface IButton {
  type?: "default";
  disabled?: boolean;
  text: string;
  onClick: any;
  loading?: boolean;
}

export const Button = ({
  type,
  disabled = false,
  text,
  onClick,
  loading = false,
}: IButton) => {
  return (
    <ButtonPrimary disabled={disabled} onClick={() => onClick()}>
      {text}
    </ButtonPrimary>
  );
};

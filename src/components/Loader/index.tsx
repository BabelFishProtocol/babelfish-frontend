import React from "react";

interface ICircleWave {
  loading: boolean;
  status: "success" | "failed" | "unknown";
}

export const CircleWave = ({ loading, status }: ICircleWave) => {
  return (
    <div
      style={{
        width: "80px",
        height: "80px",
        background: "transparent",
        borderRadius: "50%",
        border: "3px solid white",
      }}
    ></div>
  );
};

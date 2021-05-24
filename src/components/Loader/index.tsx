import React from "react";

interface ICircleWave {
  loading: boolean;
}

export const CircleWave = ({ loading }: ICircleWave) => {
  return (
    <div style={{ width: "100px", height: "100px", background: "white" }}></div>
  );
};

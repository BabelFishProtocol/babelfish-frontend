import React from "react";
import { Card, TransactionCard } from "./lib/components";
import { Deposit } from "./containers";
import { Body } from "./styles";

function App() {
  return (
    <Body className="constainer d-flex justify-content-center align-items-center">
      <div style={{ height: "80%", width: "80%" }} className="row g-0 p-5 ">
        <Deposit />
      </div>
    </Body>
  );
}

export default App;

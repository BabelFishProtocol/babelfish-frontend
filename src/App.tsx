import React from "react";
import { Card, TransactionCard } from "./lib/components";
import { Deposit } from "./containers";
import { Body } from "./styles";

function App() {
  return (
    <Body>
      <div style={{ height: "100%" }} className="row g-0 p-5">
        <Deposit />
      </div>
    </Body>
  );
}

export default App;

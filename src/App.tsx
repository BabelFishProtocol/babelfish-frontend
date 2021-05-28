import React from "react";
import { Card, TransactionCard } from "./lib/components";
import { Body } from "./styles";
import { Dashboard } from "./containers/dashboard";
import { Deposit } from "./containers/deposit";

function App() {
  return (
    <Body>
      <div style={{ width: "80%" }} className="row g-0 p-5 ">
        <Deposit />
      </div>
    </Body>
  );
}

export default App;

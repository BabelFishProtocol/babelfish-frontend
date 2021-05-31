import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {Card, TransactionCard} from './lib/components';
import {Dashboard} from './containers/dashboard';
import {Deposit} from './containers/deposit';
import {Body} from './styles';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Body>
            <div style={{width: '80%'}} className="row g-0 p-5 ">
              <Dashboard />
            </div>
          </Body>
        </Route>
        <Route path="/deposit">
          <Body>
            <div style={{width: '80%'}} className="row g-0 p-5 ">
              <Deposit />
            </div>
          </Body>
        </Route>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

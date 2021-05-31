import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {Dashboard} from './containers/dashboard';
import {Deposit} from './containers/deposit';
import {Body} from './styles';

function App() {
  return (
    <Body>
      <div style={{width: '80%'}} className="row g-0 p-5 ">
        <Router>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/deposit">
              <Deposit />
            </Route>
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Router>
      </div>
    </Body>
  );
}

export default App;

import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {Header} from './components/Header';
import {Dashboard} from './containers/dashboard';
import {Deposit} from './containers/deposit';
import {Landing} from './containers/landing';
import {Redeem} from './containers/redeem';
import {Banner} from './lib/components/Banner';
import {Body, Content} from './styles';

function App() {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <Body>
      {showBanner && (
        <Banner
          onClose={() => setShowBanner(!showBanner)}
          children={
            <span>
              Alpha 0.1: Deposit/withdraw stablecoins from Ethereum and
              mint/burn meta-stablecoins on Rootstock. Visit our Discord for
              more information.
              <br />
              WARNING: This is an early experiment and there is risk of loss of
              funds. DON'T PANIC!.
            </span>
          }
        />
      )}
      <Header />
      <Content className="row g-0">
        <Router>
          <Switch>
            <Route path="/landing" exact>
              <Landing />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/deposit" exact>
              <Deposit />
            </Route>
            <Route path="/redeem" exact>
              <Redeem />
            </Route>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Body>
  );
}

export default App;

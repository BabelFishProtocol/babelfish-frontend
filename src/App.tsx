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
      <Router>
        <Header />
        <Content className="row g-0">
          <Switch>
            <Route path="/landing" exact render={() => <Landing />}></Route>
            <Route path="/dashboard" exact render={() => <Dashboard />}></Route>
            <Route path="/deposit" exact render={() => <Deposit />}></Route>
            <Route path="/redeem" exact render={() => <Redeem />}></Route>
            <Route path="/" exact>
              <Redirect to="/landing" />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Body>
  );
}

export default App;

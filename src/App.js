import React from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Login exact path="/" component={ Login } />
        <Wallet path="/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;

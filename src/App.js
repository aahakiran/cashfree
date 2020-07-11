import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Table from './Table';
import User from './user';

function App() {
  return (
    <div>
       <Router>
        <Switch>
          <Route exact path="/" component={Table} />
          <Route path="/user" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

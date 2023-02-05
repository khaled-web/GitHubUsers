import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* pass:- HomePage && must set exact to separate Dashboard and login*/}
      <Route path="/" exact={true}>
        <Dashboard></Dashboard>
      </Route>
      {/* pass:-login */}
      <Route path="/login">
        <Login />
      </Route>
      {/* <Error /> */}
    </Router>
  );
}

export default App;

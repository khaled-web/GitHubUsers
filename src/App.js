import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/*<Switch> to separate error-page from all pages */}
      <Switch>
      {/* pass:- HomePage && must set "exact" to separate Dashboard and login pages*/}
      <Route path="/" exact={true}>
        <Dashboard></Dashboard>
      </Route>
      {/* pass:-login */}
      <Route path="/login">
        <Login></Login>
      </Route>
      {/* pass:- Error */}
      <Route path="*">
        <Error></Error>
      </Route>
      </Switch>
    </Router>
  );
}

export default App;

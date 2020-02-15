import React, {FC} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import LoggedInRoute from './components/LoggedInRoute/LoggedInRoute';
import NavBar from './components/NavBar/NavBar';
import Error from './components/Error/Error';
import Register from './components/Register/Register';
import LoggedOutRoute from './components/LoggedOutRoute/LoggedOutRoute';
import Profile from './components/Profile/Profile';
import Container from '@material-ui/core/Container';
import Home from './components/Home/Home';

const App: FC = () => {
  return (
    <div className="App">
      <NavBar />

      <Container className="Container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/error">
            <Error />
          </Route>

          <LoggedOutRoute path="/login">
            <Login />
          </LoggedOutRoute>

          <LoggedOutRoute path="/register">
            <Register />
          </LoggedOutRoute>

          <LoggedInRoute path="/profile">
            <Profile />
          </LoggedInRoute>
        </Switch>
      </Container>
    </div>
  );
};

export default App;

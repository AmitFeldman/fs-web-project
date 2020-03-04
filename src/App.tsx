import React, {FC} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Error from './components/Error/Error';
import Register from './components/Register/Register';
import LoggedOutRoute from './components/LoggedOutRoute/LoggedOutRoute';
import Profile from './components/Profile/Profile';
import Container from '@material-ui/core/Container';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import ScrollTop from './components/ScrollTop/ScrollTop';

const ANCHOR = 'back-to-top-anchor';

const App: FC = () => {
  return (
    <div className="App">
      <div id={ANCHOR}>
        <NavBar />
      </div>

      <Container className="Container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/error">
            <Error />
          </Route>

          <Route path="/post/:postId">
            <Post />
          </Route>

          <Route path="/user/:username">
            <Profile />
          </Route>

          <LoggedOutRoute path="/login">
            <Login />
          </LoggedOutRoute>

          <LoggedOutRoute path="/register">
            <Register />
          </LoggedOutRoute>
        </Switch>
      </Container>

      <ScrollTop anchorId={ANCHOR} />
    </div>
  );
};

export default App;

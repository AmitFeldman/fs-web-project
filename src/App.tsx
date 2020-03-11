import React, {FC} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
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
import About from './components/About/About';
import AdminRoute from './components/AdminRoute/AdminRoute';
import ManageUsers from './components/ManageUsers/ManageUsers';
import Statistics from './components/Statistics/Statisitcs';

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

          <Route path="/about">
            <About />
          </Route>

          <AdminRoute path="/admin/users">
            <ManageUsers />
          </AdminRoute>

          <AdminRoute path="/admin/statistics">
            <Statistics />
          </AdminRoute>

          <LoggedOutRoute path="/login">
            <Login />
          </LoggedOutRoute>

          <LoggedOutRoute path="/register">
            <Register />
          </LoggedOutRoute>

          <Redirect from="*" to="/error" />
        </Switch>
      </Container>

      <ScrollTop anchorId={ANCHOR} />
    </div>
  );
};

export default App;

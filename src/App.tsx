import './App.css';
import React, {FC, lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ScrollTop from './components/ScrollTop/ScrollTop';
import AdminRoute from './components/AdminRoute/AdminRoute';
import LoggedOutRoute from './components/LoggedOutRoute/LoggedOutRoute';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

// Lazy route imports
const Home = lazy(() => import('./components/Home/Home'));
const Error = lazy(() => import('./components/Error/Error'));
const PostForm = lazy(() => import('./components/PostForm/PostForm'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const About = lazy(() => import('./components/About/About'));
const ManageUsers = lazy(() => import('./components/ManageUsers/ManageUsers'));
const Statistics = lazy(() => import('./components/Statistics/Statistics'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));

const ANCHOR = 'back-to-top-anchor';

const App: FC = () => {
  return (
    <div className="App">
      <div id={ANCHOR}>
        <NavBar />
      </div>

      <Container className="Container">
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/error" component={Error} />
            <Route path="/post/:postId" component={PostForm} />
            <Route path="/user/:username" component={Profile} />
            <Route path="/about" component={About} />

            <AdminRoute path="/admin/users" component={ManageUsers} />
            <AdminRoute path="/admin/statistics" component={Statistics} />

            <LoggedOutRoute path="/login" component={Login} />
            <LoggedOutRoute path="/register" component={Register} />

            <Redirect from="*" to="/error" />
          </Switch>
        </Suspense>
      </Container>

      <ScrollTop anchorId={ANCHOR} />
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { AuthProvider } from './context/auth'
import AuthRoute from './util/auth-route';
import MenuBar from './components/menu-bar';
import HomePage from './pages/home';
import SetsPage from './pages/sets';
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import CreateProfilePage from './pages/create-profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container>
          <Route exact path="/" component={HomePage} />
          <Route path='/profile/add' component={CreateProfilePage} />
          <Route path='/sets' component={SetsPage} />
          <AuthRoute exact path="/signup" component={SignupPage} />
          <AuthRoute exact path="/login" component={LoginPage} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

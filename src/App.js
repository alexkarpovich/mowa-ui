import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthProvider } from './context/auth'
import AuthRoute from './util/auth-route';
import MenuBar from './modules/menu/components/menu-bar';
import HomePage from './modules/home/pages/home.page';
import SetsPage from './modules/set/pages/sets.page';
import SignupPage from './modules/auth/pages/signup.page';
import LoginPage from './modules/auth/pages/login.page';
import CreateProfilePage from './modules/profile/pages/create-profile.page';
import TrainingPage from './modules/training/pages/training.page';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router basename='/'>
        <MenuBar />
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path='/profile/add' component={CreateProfilePage} />
          <Route path='/sets' component={SetsPage} />
          <Route path='/training/:id' component={TrainingPage} />
          <AuthRoute exact path="/signup" component={SignupPage} />
          <AuthRoute exact path="/login" component={LoginPage} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

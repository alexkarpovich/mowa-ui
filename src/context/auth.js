import React, { createContext, useReducer } from 'react';
import { useQuery } from '@apollo/react-hooks';
import jwtDecode from 'jwt-decode';
import { ME_QUERY } from "../graphql/schemas/account";

const initialState = {
  isAuthenticated: false,
  user: null
};

if (localStorage.getItem('token')) {
  const decoded = jwtDecode(localStorage.getItem('token'));

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.isAuthenticated = true;
  }
}

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (data) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { data } = useQuery(ME_QUERY, { skip: !state.isAuthenticated });

  function login(userData) {
    localStorage.setItem('token', userData.token);

    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: data ? data.me : null, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

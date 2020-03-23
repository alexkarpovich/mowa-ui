import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import {setContext} from 'apollo-link-context';

import typeDefs from './graphql/typeDefs';
import resolvers from 'graphql/resolvers';

const httpLink = createHttpLink({
  uri: `https://api.mowy.xyz/graphql`
});

const authLink = setContext(() => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id,
  }),
  typeDefs,
  resolvers,
});


export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);

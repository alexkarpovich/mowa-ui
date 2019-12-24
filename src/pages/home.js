import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const USERS = gql`
    query UsersQuery {
        users {
            id
            username
            email
        }
    }
`;

function HomePage() {
    const { loading, error, data } = useQuery(USERS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.users.map(({ id, username, email }) => (
      <div key={id}>
        <p>
          {username}: {email}
        </p>
      </div>
    ));
  }

export default HomePage;
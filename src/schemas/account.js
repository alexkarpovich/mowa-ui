import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        profiles {
          id
          name
          active
        }
      }
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: UserCreateInput!) {
    signup(input: $input) {
      user {
        id
        email
        profiles {
          id
          name
          active
        }
      }
      token
    }
  }
`;

export const SETS_QUERY = gql`
{
    sets {
        id
        name
        count
    }
}
`;

export const SEARCH_TRANSLATIONS_QUERY = gql`
query SearchTranslations($termId: ID!, $value: String!) {
    searchTranslations(termId: $termId, value: $value) {
        id
        value
        transcription
        details
    }
}
`;

export const ADD_SET = gql`
mutation AddSet($name: String!) {
    addSet(name: $name) {
        id
        name
        count
    }
}
`;

export const ADD_PROFILE = gql`
  mutation AddProfile($input: ProfileCreateInput!) {
    addProfile(input: $input)
  }
`;

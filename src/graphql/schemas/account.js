import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: UserCreateInput!) {
    signup(input: $input) {
      token
    }
  }
`;

export const ME_QUERY = gql`
  {
    me {
      id
      email
      activeProfile @client
      profiles {
        id
        name
        active
        learnLang {
          code
        }
      }
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
  mutation AddProfile($input: AddProfileInput!) {
    addProfile(input: $input) {
      id
      name
      learnLang {
        code
      }
    }
  }
`;

export const ACTIVATE_PROFILE = gql`
  mutation ActivateProfile($id: ID!) {
    activateProfile(id: $id)
  }
`;

export const ACTIVATE_PROFILE_CLIENT = gql`
  mutation ActivateProfile($id: ID!) {
    activateProfile(id: $id) @client
  }
`;

export const UNSHIFT_PROFILE = gql`
  mutation UnshiftProfile($profile: Profile!) {
    addProfile(profile: $profile) @client
  }
`;

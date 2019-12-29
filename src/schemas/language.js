import { gql } from 'apollo-boost';

export const LANGUAGES_QUERY = gql`
  {
    languages {
      name
      code
    }
  }
`;

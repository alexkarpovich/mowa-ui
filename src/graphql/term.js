import { gql } from 'apollo-boost';

export const EDIT_TERM = gql`
mutation EditTerm($input: TermEditInput!) {
    editTerm(input: $input) {
        id
    }
}
`;

export const TERM_FRAGMENT = gql`
  fragment anTerm on Term {
    id
    value
    translations {
      id
      value
      details
      transcription
    }
  }
`;

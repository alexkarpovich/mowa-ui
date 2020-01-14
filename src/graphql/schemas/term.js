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
    transcriptions
    translations {
      id
      value
      details
      transcription
    }
  }
`;


export const ADD_TRANSLATION = gql`
  mutation AddTranslation($termId: ID!, $translation: Translation!) {
    addTranslation(termId: $termId, translation: $translation) @client
  }
`;

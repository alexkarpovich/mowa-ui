import { gql } from 'apollo-boost';

export const TERMS = gql`
query Terms($ids: [ID!]!) {
    terms(ids: $ids) {
        id
        value
        transcription
        translations {
            id
            value
            transcription
            details
        }
    }
}
`;

export const ATTACH_TERM = gql`
mutation AttachTerm($id: ID!, $value: String!) {
    attachTerm(id: $id, value: $value) {
        id
        value
        transcription
        translations {
            id
            value
            transcription
            details
        }
    }
}
`;

export const ATTACH_TRANSLATION = gql`
  mutation AttachTranslation($input: AttachTranslationInput!) {
    attachTranslation(input: $input) {
      id
      value
      transcription
      details
    }
  }
`;

export const DELETE_SET = gql`
mutation DeleteSet($id: ID!) {
    deleteSet(id: $id)
}
`;

export const SET_FRAGMENT = gql`
  fragment anSet on Set {
    id
    name
    count
  }
`;

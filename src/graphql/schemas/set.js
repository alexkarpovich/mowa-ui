import { gql } from 'apollo-boost';

export const TERMS = gql`
query Terms($ids: [ID!]!) {
    terms(ids: $ids) {
        id
        value
        transcriptions
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
        transcriptions
        translations {
            id
            value
            transcription
            details
        }
    }
}
`;

export const UNSHIFT_TERM = gql`
  mutation UnshiftTerm($setId: ID!, $term: Term!) {
    unshiftTerm(setId: $setId, term: $term) @client
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

export const DETACH_TRANSLATION = gql`
  mutation DetachTranslation($setId: ID!, $translationId: ID!) {
    detachTranslation(setId: $setId, translationId: $translationId)
  }
`;

export const UNSHIFT_SET = gql`
  mutation UnshiftSet($set: Set!) {
    unshiftSet(set: $set) @client
  }
`;

export const EDIT_SET = gql`
  mutation EditSet($id: ID!, $name: String!) {
    editSet(id: $id, name: $name)
  }
`;

export const CLONE_SET = gql`
  mutation CloneSet($ids: [ID!], $name: String!) {
    cloneSet(ids: $ids, name: $name) {
      id
      name
      count
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

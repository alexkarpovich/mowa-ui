import { gql } from 'apollo-boost';

export const SELECTION_TERMS = gql`
query SelectionTerms($id: ID!) {
    selectionTerms(id: $id) {
        id
        text
        translations {
            id
            text
            transcription
            details
        }
    }
}
`;

export const ADD_SELECTION_TERM = gql`
mutation AddSelectionTerm($id: ID!, $text: String!) {
    addSelectionTerm(id: $id, text: $text) {
        id
        text
        translations {
            id
            text
            transcription
            details
        }
    }
}
`;

export const ADD_SELECTION_TRANSLATIONS = gql`
  mutation AddSelectionTranslations($id: ID!, $termId: ID!, $translations: [TranslationCreateInput!]!) {
    addSelectionTranslations(id: $id, termId: $termId, translations: $translations) {
      id
      text
      transcription
      details
    }
  }
`;

export const DELETE_SELECTION = gql`
mutation DeleteSelection($id: ID!) {
    deleteSelection(id: $id)
}
`;

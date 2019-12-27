import { gql } from 'apollo-boost';

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

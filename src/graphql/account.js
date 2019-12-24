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
query SearchTranslations($value: String!) {
    searchTranslations(value: $value) {
        id
        value
        transcription
        details
    }
}
`;

export const SET_FRAGMENT = gql`
fragment anSet on Set {
    id
    name
    count
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

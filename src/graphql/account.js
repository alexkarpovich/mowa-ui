import { gql } from 'apollo-boost';

export const ACCOUNT_SELECTIONS_QUERY = gql`
{    
    accountSelections {
        id
        name
        count
    }
}
`;

export const ACCOUNT_SEARCH_TRANSLATIONS_QUERY = gql`
query AccountSearchTranslations($text: String!) {    
    accountSearchTranslations(text: $text) {
        id
        text
        transcription
        details
    }
}
`;

export const ACCOUNT_SELECTIONS_FRAGMENT = gql`
fragment anAccountSelection on Selection {
    id
    name
    count
}
`;

export const ADD_ACCOUNT_SELECTION = gql`
mutation AddAccountSelection($name: String!) {
    addAccountSelection(name: $name) {
        id
        name
        count
    }
}
`;
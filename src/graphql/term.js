import { gql } from 'apollo-boost';

export const EDIT_TERM = gql`
mutation EditTerm($input: TermEditInput!) {
    editTerm(input: $input) {
        id
    }
}
`;

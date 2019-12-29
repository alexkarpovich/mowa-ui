import { gql } from 'apollo-boost';

export const ENSURE_TRAINING = gql`
  mutation EnsureTraining($type: Int!, $setIds: [ID!]!) {
    ensureTraining(type: $type, setIds: $setIds) {
      id
      type
    }
  }
`;


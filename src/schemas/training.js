import { gql } from 'apollo-boost';

export const TRAINING_META_QUERY = gql`
  query TrainingMetaQuery($id: ID!) {
    trainingMeta(id: $id) {
      type
      total
      complete
    }
  }
`;

export const TRAINING_ITEM_QUERY = gql`
  query TrainingItemQuery($id: ID!) {
    trainingItem(id: $id) {
      term {
        value
      }
      translation {
        id
        value
        transcription
        details
      }
    }
  }
`;

export const ENSURE_TRAINING = gql`
  mutation EnsureTraining($type: Int!, $setIds: [ID!]!) {
    ensureTraining(type: $type, setIds: $setIds) {
      id
      type
    }
  }
`;

export const RESET_TRAINING = gql`
  mutation ResetTraining($id: ID!) {
    resetTraining(id: $id)
  }
`;

export const COMPLETE_ITEM = gql`
  mutation CompleteItem($id: ID!, $translationId: ID!) {
    completeItem(id: $id, translationId: $translationId)
  }
`;


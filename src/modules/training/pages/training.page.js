import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TRAINING_META_QUERY } from 'graphql/schemas/training';
import { Spinner } from 'react-bootstrap';

import { StyledTrainingPage } from "../components/training-page.style";
import TrainingContainer from '../components/training-container';

function TrainingPage({ match }) {
  const { id } = match.params;
  const { loading, data, refetch } = useQuery(TRAINING_META_QUERY, {
    variables: { id }
  });

  return (
    <StyledTrainingPage>
      { loading || !data ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <TrainingContainer
          id={id}
          meta={data.trainingMeta}
          refetchMeta={refetch}
        />
      ) }
    </StyledTrainingPage>
  );
}

export default TrainingPage;

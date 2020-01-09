import React, { Fragment, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { TRAINING_META_QUERY, RESET_TRAINING } from '../../../graphql/schemas/training';
import { ProgressBar, Spinner } from 'react-bootstrap';

import { StyledTrainingPage } from "../components/training-page.style";
import TrainingContainer from '../components/training-card/training-container';
import TrainingBreak from '../components/training-break/training-break';

function TrainingPage({ match }) {
  const { id } = match.params;
  const { loading, data, refetch } = useQuery(TRAINING_META_QUERY, {
    variables: { id }
  });
  const [showBreak, setShowBreak] = useState(data && data.trainingMeta.complete > 0);
  const [reset] = useMutation(RESET_TRAINING, {
    variables: { id },
    async update() {
      await refetch();
      setShowBreak(false);
    }
  });

  return (
    <StyledTrainingPage>
      { loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Fragment>
          <ProgressBar
            striped
            variant="success"
            min={0}
            max={data.trainingMeta.total}
            now={data.trainingMeta.complete}
          />

          { (showBreak || data.trainingMeta.complete === data.trainingMeta.total) ? (
            <TrainingBreak
              meta={data.trainingMeta}
              onRestart={reset}
              onContinue={() => setShowBreak(false)}
            />
          ) : (
            <TrainingContainer
              trainingId={id}
              type={data.trainingMeta.type}
              meta={data.trainingMeta}
            />
          )}
        </Fragment>
      ) }
    </StyledTrainingPage>
  );
}

export default TrainingPage;

import cloneDeep from 'lodash/cloneDeep';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Spinner, ProgressBar } from 'react-bootstrap';

import { TRAINING_ITEM_QUERY, COMPLETE_ITEM, TRAINING_META_QUERY } from 'graphql/schemas/training';
import { StyledTrainingCardContainer } from "./training-card-container.style";
import CardAsking from './trans-term/card-asking';
import CardDetails from './trans-term/card-details';

function TrainingCardContainer({ trainingId, meta }) {
  const { loading, data, refetch } = useQuery(TRAINING_ITEM_QUERY, {
    variables: { id: trainingId }
  });
  const [cardState, setCardState] = useState(0);
  const [completeItem] = useMutation(COMPLETE_ITEM);

  async function complete() {
    return completeItem({
      variables: { id: trainingId, translationId: data.trainingItem.translation.id },
      update(proxy) {
        const options = {
          query: TRAINING_META_QUERY,
          variables: { id: trainingId }
        };
        const root = cloneDeep(proxy.readQuery(options));
        root.trainingMeta.complete++;
        proxy.writeQuery({ ...options, data: root});
        fetchNext();
      }
    });
  }

  async function fetchNext() {
    await refetch();
    setCardState(0);
  }

  return (
    <StyledTrainingCardContainer>
      <div className="progress-container">
        <ProgressBar variant="info" now={meta.complete / meta.total * 100} />
        { meta.type === 1 && <ProgressBar variant="warning" now={((meta.complete / (meta.total / meta.stages.length)) % 1) * 100 } /> }
      </div>

      { loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Fragment>
          { cardState === 0 && (
            <CardAsking
              translation={data.trainingItem.translation}
              onShow={() => setCardState(1)}
            />
          ) }
          { cardState === 1 && (
            <CardDetails
              term={data.trainingItem.term}
              translation={data.trainingItem.translation}
              onComplete={complete}
              onRepeat={fetchNext}
            />
          ) }
        </Fragment>
      ) }
    </StyledTrainingCardContainer>
  );
}

TrainingCardContainer.propTypes = {
  trainingId: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
};

export default TrainingCardContainer;

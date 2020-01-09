import cloneDeep from 'lodash/cloneDeep';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Spinner } from 'react-bootstrap';

import { TRAINING_ITEM_QUERY, COMPLETE_ITEM, TRAINING_META_QUERY } from 'graphql/schemas/training';
import { StyledTrainingContainer } from "./training-container.style";
import CardAsking from './trans-term/card-asking';
import CardDetails from './trans-term/card-details';

function TrainingContainer({ trainingId }) {
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
    <StyledTrainingContainer>
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
    </StyledTrainingContainer>
  );
}

TrainingContainer.propTypes = {
  trainingId: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
};

export default TrainingContainer;

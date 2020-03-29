import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import { RESET_TRAINING } from 'graphql/schemas/training';

import TrainingCardContainer from './training-card/training-card-container';
import TrainingBreak from '../components/training-break/training-break';

function TrainingContainer({ id, meta, refetchMeta }) {
  const [showBreak, setShowBreak] = useState(meta.complete > 0);
  const [reset] = useMutation(RESET_TRAINING, {
    variables: { id },
    async update() {
      await refetchMeta();
      setShowBreak(false);
    }
  });

  return showBreak ? (
    <TrainingBreak
      meta={meta}
      onRestart={reset}
      onContinue={() => setShowBreak(false)}
    />
  ) : (
    <TrainingCardContainer
      trainingId={id}
      type={meta.type}
      meta={meta}
    />
  );
}

TrainingContainer.propTypes = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  refetchMeta: PropTypes.func.isRequired,
};

export default TrainingContainer;

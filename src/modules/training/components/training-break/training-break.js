import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';

import { StyledTrainingBreak } from "./training-break.style";

function TrainingBreak({ meta, onRestart, onContinue }) {
  const canContinue = meta.complete < meta.total;

  return (
    <StyledTrainingBreak>
      <div className="content">
        <ButtonGroup vertical>
          <Button variant="success" onClick={onRestart}>Заново</Button>
          { canContinue && <Button variant="dark" onClick={onContinue}>Продолжить</Button> }
        </ButtonGroup>
      </div>
    </StyledTrainingBreak>
  );
}

TrainingBreak.propTypes = {
  meta: PropTypes.object.isRequired,
  onRestart: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default TrainingBreak;

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function TrainingBreak({ onRestart, onContinue }) {

  return (
    <div>
      <Button onClick={onRestart}>Заново</Button>
      <Button onClick={onContinue}>Продолжить</Button>
    </div>
  );
}

TrainingBreak.propTypes = {
  onRestart: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default TrainingBreak;

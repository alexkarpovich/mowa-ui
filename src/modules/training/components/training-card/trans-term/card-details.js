import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CardDetails({ term, translation, onComplete, onRepeat }) {

  return (
    <div>
      <div>{term.value}</div>
      <div>{translation.transcription}</div>
      <div>{translation.value}</div>
      <div>{translation.details}</div>
      <Button onClick={onRepeat}>Повторить</Button>
      <Button onClick={onComplete}>Дальше</Button>
    </div>
  );
}

CardDetails.propTypes = {
  term: PropTypes.object.isRequired,
  translation: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onRepeat: PropTypes.func.isRequired,
};

export default CardDetails;

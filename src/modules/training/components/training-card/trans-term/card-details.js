import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';

import { StyledCardDetails } from "./card-details.style";

function CardDetails({ term, translation, onComplete, onRepeat }) {
  return (
    <StyledCardDetails>
      <div className="content">
        <div className="term">{term.value}</div>
        <div className="transcription">{translation.transcription}</div>
        <div className="translation">{translation.value}</div>
        <div className="details">{translation.details}</div>
      </div>

      <ButtonGroup className="mr-2" aria-label="First group">
        <Button onClick={onRepeat}>Повторить</Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="First group">
        <Button onClick={onComplete}>Дальше</Button>
      </ButtonGroup>
    </StyledCardDetails>
  );
}

CardDetails.propTypes = {
  term: PropTypes.object.isRequired,
  translation: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onRepeat: PropTypes.func.isRequired,
};

export default CardDetails;

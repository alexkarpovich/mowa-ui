import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';

import { StyledCardDetails } from "./card-details.style";

function CardDetails({ term, translation, onComplete, onRepeat }) {
  const cardRef = useRef(null);

  useEffect(() => {
    cardRef.current.focus();
  }, [cardRef]);

  function handleKeyUp(event) {
    if (event.keyCode === 32) { /* Space keyCode */
      if (event.ctrlKey) {
        onRepeat();
      } else {
        onComplete()
      }
    }
  }
  return (
    <StyledCardDetails
      tabIndex={-1}
      ref={cardRef}
      onKeyUp={handleKeyUp}
    >
      <StyledCardDetails.Body>
        <div className="term">{term.value}</div>
        <div className="transcription">{translation.transcription}</div>
        <div className="translation">{translation.value}</div>
        <div className="details">{translation.details}</div>
      </StyledCardDetails.Body>
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

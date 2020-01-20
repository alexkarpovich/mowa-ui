import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import { StyledCardDetails } from "./card-details.style";

function CardDetails({ term, translation, onComplete, onRepeat }) {
  const cardRef = useRef(null);
  const [sound] = useState(new Audio(`http://tts.baidu.com/text2audio?tex=${term.value}&cuid=dict&lan=ZH&ctp=1&pdt=30&vol=9&spd=4`));

  useEffect(() => {
    cardRef.current.focus();
  }, [cardRef]);

  function handleKeyUp(event) {
    if (event.keyCode === 32) { /* Space keyCode */
      if (event.shiftKey) {
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
        <FontAwesomeIcon icon={faVolumeUp} onClick={() => sound.play()} />
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

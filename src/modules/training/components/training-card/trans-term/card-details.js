import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { Swipeable } from 'react-swipeable'

import { AuthContext } from 'context/auth';
import { speachAudio } from 'util/pronounce';
import { StyledCardDetails } from "./card-details.style";

const swipeConfig = {
  delta: 10,                             // min distance(px) before a swipe starts
  preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
  trackTouch: true,                      // track touch input
  trackMouse: true,                     // track mouse input
  rotationAngle: 0,                      // set a rotation angle
};

function CardDetails({ term, translation, onComplete, onRepeat }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  function handleKeyUp(event) {
    if (event.code === 'Space') {
      if (event.shiftKey) {
        onRepeat();
      } else {
        onComplete()
      }
    }
  }

  function onCompleteHandler({ event }) {
    event.preventDefault();

    onComplete();
  }

  function onRepeatHandler({ event }) {
    event.preventDefault();

    onRepeat();
  }

  function playTranscription(text) {
    const audio = speachAudio({ text, language: user.activeProfile.learnLang.code }); 
    audio.play(); 
  }

  return (
    <Swipeable
      onSwipedUp={onCompleteHandler}
      onSwipedDown={onRepeatHandler}
      {...swipeConfig}
    >
      <StyledCardDetails onKeyUp={handleKeyUp}>
        <StyledCardDetails.Body>
          <div className="term">{term.value}</div>
          <FontAwesomeIcon icon={faVolumeUp} onClick={() => playTranscription(translation.transcription)} />
          <div className="transcription">{translation.transcription}</div>
          <div className="translation">{translation.value}</div>
          <div className="details">{translation.details}</div>
        </StyledCardDetails.Body>
      </StyledCardDetails>
    </Swipeable>
  );
}

CardDetails.propTypes = {
  term: PropTypes.object.isRequired,
  translation: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onRepeat: PropTypes.func.isRequired,
};

export default CardDetails;

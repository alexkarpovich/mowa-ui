import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { StyledCardAsking } from "./card-asking.style";

function CardAsking({ translation, onShow }) {
  const cardRef = useRef(null);

  useEffect(() => {
    cardRef.current.focus();
  }, [cardRef]);

  function handleKeyUp(event) {
    event.keyCode === 32 && onShow();
  }

  return (
    <StyledCardAsking
      tabIndex={-1}
      ref={cardRef}
      onClick={onShow}
      onKeyUp={handleKeyUp}
    >
      <StyledCardAsking.Body>
        <div className="content">
          <div className="translation">{translation.value}</div>
          <div className="details">{translation.details}</div>
        </div>
      </StyledCardAsking.Body>
    </StyledCardAsking>
  );
}

CardAsking.propTypes = {
  translation: PropTypes.object.isRequired,
  onShow: PropTypes.func.isRequired,
};

export default CardAsking;

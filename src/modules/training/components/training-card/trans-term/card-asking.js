import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { StyledCardAsking } from "./card-asking.style";

function CardAsking({ translation, onShow }) {

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  function handleKeyUp(event) {
    event.code === 'Space' && onShow();
  }

  return (
    <StyledCardAsking onClick={onShow}>
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

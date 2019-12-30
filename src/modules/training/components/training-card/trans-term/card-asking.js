import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { StyledCardAsking } from "./card-asking.style";

function CardAsking({ translation, onShow }) {

  return (
    <StyledCardAsking>
      <div className="content">
        <div className="translation">{translation.value}</div>
        <div className="details">{translation.details}</div>
      </div>
      <Button className="show-btn" onClick={onShow}>Показать</Button>
    </StyledCardAsking>
  );
}

CardAsking.propTypes = {
  translation: PropTypes.object.isRequired,
  onShow: PropTypes.func.isRequired,
};

export default CardAsking;

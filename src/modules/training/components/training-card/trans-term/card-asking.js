import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CardAsking({ translation, onShow }) {

  return (
    <div>
      <div>{translation.value}</div>
      <div>{translation.details}</div>
      <Button onClick={onShow}>Показать</Button>
    </div>
  );
}

CardAsking.propTypes = {
  translation: PropTypes.object.isRequired,
  onShow: PropTypes.func.isRequired,
};

export default CardAsking;

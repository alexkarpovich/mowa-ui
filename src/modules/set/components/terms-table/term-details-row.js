import React from 'react';
import PropTypes from 'prop-types';

function TermDetailsRow({ object, show }) {
  return (
    <tr className={`term-details-row ${show ? 'show' : ''}`}>
      <td colSpan={3}>

      </td>
    </tr>
  );
}

TermDetailsRow.propTypes = {
  object: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

export default TermDetailsRow;

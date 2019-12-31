import React, { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';

import TermTranslator from "./term-translator";
import TranslationItem from './translation-item';

function TermRow(props) {
  const {index, setId, object} = props;
  const transRef = useRef(null);
  const [showPopover, setShowPopover] = useState(false);

  function displayPopover(e) {
    setShowPopover(true);
    e.stopPropagation();
  }

  function hidePopover(e) {
    setShowPopover(false);
    e.stopPropagation();
  }

  return (
    <tr key={index} className="term">
      <td>{index}</td>
      <td>
        <div className="value">{object.value}</div>
        <div className="transcription">{object.transcription}</div>
      </td>
      <td ref={transRef} onClick={displayPopover}>
        {object.translations.map((trans, i) => (
          <TranslationItem key={i} translation={trans}/>
        ))}

        <Overlay
          show={showPopover}
          target={transRef}
          placement="bottom"
          containerPadding={20}
        >
          <Popover style={{ width: '400px' }} position="bottom">
            <Popover.Content>
              <TermTranslator
                id={object.id}
                setId={setId}
                onClose={hidePopover}
              />
            </Popover.Content>
          </Popover>
        </Overlay>
      </td>
    </tr>
  );
}

TermRow.propTypes = {
  index: PropTypes.number.isRequired,
  setId: PropTypes.string.isRequired,
  object: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    translations: PropTypes.array,
  }).isRequired,
};


export default TermRow;

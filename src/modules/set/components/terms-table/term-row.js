import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';

import TermTranslator from "./term-translator";
import TranslationItem from './translation-item';

const UpdatingPopover = React.forwardRef(
  ({ scheduleUpdate, children, ...props }, ref) => {
    useEffect(() => {
      scheduleUpdate();
    }, [children, scheduleUpdate]);
    return (
      <Popover ref={ref} {...props}>
        {children}
      </Popover>
    );
  },
);

function TermRow(props) {
  const {index, setId, object} = props;
  const transRef = useRef(null);
  const [showPopover, setShowPopover] = useState(false);

  function displayPopover(e) {
    const scrollPos = { x: window.scrollX, y: window.scrollY };
    setShowPopover(true);
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => window.scroll(scrollPos.x, scrollPos.y), 0);
  }

  function hidePopover(e) {
    setShowPopover(false);
    e.preventDefault();
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
          <UpdatingPopover style={{ width: '400px' }} position="bottom">
            <Popover.Content>
              <TermTranslator
                id={object.id}
                setId={setId}
                onClose={hidePopover}
              />
            </Popover.Content>
          </UpdatingPopover>
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

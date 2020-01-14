import React, { Fragment, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import TermTranslator from "./term-translator";
import TranslationItem from './translation-item';
import TermDetailsRow from "./term-details-row";

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

function TermPreviewRow(props) {
  const {index, setId, object} = props;
  const transRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

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
    <Fragment>
      <tr className="term-preview-row">
        <td className="index" onClick={toggleDetails}>
          {index}
          <FontAwesomeIcon icon={showDetails ? faChevronUp : faChevronDown} />
        </td>
        <td>
          <div className="value">{object.value}</div>
          <div className="transcriptions">{object.transcriptions.join(', ')}</div>
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
      <TermDetailsRow object={object} show={showDetails} />
    </Fragment>
  );
}

TermPreviewRow.propTypes = {
  index: PropTypes.number.isRequired,
  setId: PropTypes.string.isRequired,
  object: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    transcriptions: PropTypes.array.isRequired,
    translations: PropTypes.array,
  }).isRequired,
};


export default TermPreviewRow;

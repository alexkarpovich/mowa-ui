import React, {Fragment, useRef, useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import { Button, Overlay, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { speachAudio } from "util/pronounce";
import { AuthContext } from "context/auth";
import TermTranslator from "./term-translator";
import TranslationItem from './translation-item';
import TermDetailsRow from "./term-details-row";
import { AddTranslationButton, StyledTermPreviewRow } from "./term-preview-row.style";


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
  const { user } = useContext(AuthContext);
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
      <StyledTermPreviewRow>
        <td className="index" onClick={toggleDetails}>
          <span>{index}</span>
          <FontAwesomeIcon icon={showDetails ? faChevronUp : faChevronDown} />
        </td>
        <td>
          <div className="value">{object.value}</div>
          <div className="transcriptions">
            {object.transcriptions.map((transcription, i) => {
              const audio = speachAudio({ text: transcription, language: user.activeProfile.learnLang.code });

              return <Button variant="link" key={i} onClick={() => audio.play()}>{transcription}</Button>
            })}
          </div>
        </td>
        <td ref={transRef}>
          {object.translations.map((trans, i) => (
            <TranslationItem
              key={i}
              setId={setId}
              translation={trans}
            />
          ))}

          <AddTranslationButton variant="link" size="sm" onClick={displayPopover}>+ добавить перевод</AddTranslationButton>

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
      </StyledTermPreviewRow>
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

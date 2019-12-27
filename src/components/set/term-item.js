import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';
import styled from 'styled-components';
import TermTranslations from "./term-translations";

const StyledTranslation = styled.div`
  line-height: 1;
  margin-left: 10px;
  position: relative;

  &:before {
    content: "-";
    color: #b1b1b1;
    position: absolute;
    left: -10px;
  }

  .details {
    font-size: 0.8em;
    color: #666;
    padding-left: 5px;
    border-left: 2px solid #666;
  }
`;

const TranslationItem = ({translation}) => (
  <StyledTranslation>
    <div>{translation.value}</div>
    <div className="details">{translation.details}</div>
  </StyledTranslation>
);

function TermItem(props) {
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

  const popover = (
    <Popover style={{width: '400px', maxWidth: '400px'}} position="bottom">
      <Popover.Content>
        <TermTranslations
          id={object.id}
          setId={setId}
          onClose={hidePopover}
        />
      </Popover.Content>
    </Popover>
  );

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
          {popover}
        </Overlay>
      </td>
    </tr>
  );
}

TermItem.propTypes = {
  index: PropTypes.number.isRequired,
  setId: PropTypes.string.isRequired,
  object: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    translations: PropTypes.array,
  }).isRequired,
};


export default TermItem;

import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from "@apollo/react-hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { DETACH_TRANSLATION } from "graphql/schemas/set";
import { StyledTranslationItem } from './translation-item.style';

const TranslationItem = ({setId, translation}) => {
  const [detachTranslation] = useMutation(DETACH_TRANSLATION, {
    variables: { setId, translationId: translation.id },
    update() {
      console.log('hello');
    }
  });

  return (
    <StyledTranslationItem>
      <div>{translation.value}</div>
      <div className="details">{translation.details}</div>

      <div className="actions">
        <FontAwesomeIcon className="delete" icon={faTimes} onClick={detachTranslation}/>
      </div>
    </StyledTranslationItem>
  );
};

TranslationItem.propTypes = {
  setId: PropTypes.string.isRequired,
  translation: PropTypes.object.isRequired
};

export default TranslationItem;

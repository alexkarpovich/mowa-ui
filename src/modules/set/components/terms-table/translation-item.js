import React from 'react';
import { StyledTranslationItem } from './translation-item.style';

const TranslationItem = ({translation}) => (
  <StyledTranslationItem>
    <div>{translation.value}</div>
    <div className="details">{translation.details}</div>
  </StyledTranslationItem>
);

export default TranslationItem;

import React from "react";
import { StyledTranslatorSelect } from "./translator-select.style";

function TranslatorSelect(props) {
  return (
    <StyledTranslatorSelect
      autoFocus
      isClearable
      className="translator-select"
      isValidNewOption={() => true}
      formatOptionLabel={(option) => {
        return (
          <div className="option-label">
            <div>{`${option.__isNew__ ? '+' : ''} ${option.value}`}</div>
            {option.details && <div className="details">{`# ${option.details}`}</div>}
          </div>
        );
      }}
      getOptionLabel={(option) => option.value}
      getOptionValue={(option) => option.id}
      {...props}
    />
  );
}

export default TranslatorSelect;

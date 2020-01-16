import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';

export const StyledTranslatorSelect = styled(CreatableSelect)`
  margin-bottom: 15px;

  & .option-label {
    & > .details {
      font-size: 0.8em;
      font-style: italic;
      color: #333;
    }
  }
`;

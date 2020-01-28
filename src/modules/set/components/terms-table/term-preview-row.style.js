import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const StyledTermPreviewRow = styled.tr`
  .index {
    font-size: 0.6em;
    cursor: pointer;
  }

  .value {
    font-size: 1.4em;
    font-family: KaiTi;
  }

  .transcriptions {
    color: #9a4115;
    white-space: nowrap;

    & > button {
      padding: 0;
      font-size: 0.8em;

      &:not(:first-child) {
        &:before {
          content: ", ";
        }
      }
    }
  }
`;

export const AddTranslationButton = styled(Button)`
  font-size: 0.7em;
  padding: 0;
  margin: 0;
`;

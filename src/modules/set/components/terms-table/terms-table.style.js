import styled from 'styled-components';
import { Table } from 'react-bootstrap';

export const StyledTable = styled(Table)`
  th.translations {
    width: 100%;
  }

  .term-preview-row {
    .index {
      font-size: 0.6em;
      cursor: pointer;
    }

    .value {
      font-size: 1.4em;
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
  }

  .term-details-row {
    display: none;

    &.show {
      display: table-row;
    }
  }
`;

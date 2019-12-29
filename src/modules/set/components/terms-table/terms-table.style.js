import styled from 'styled-components';
import { Table } from 'react-bootstrap';

export const StyledTable = styled(Table)`
  th.translations {
    width: 100%;
  }

  .term {
    .value {
      font-size: 1.4em;
    }

    .transcription {
      color: #9a4115;
      font-size: 0.8em;
      white-space: nowrap;
    }
  }
`;

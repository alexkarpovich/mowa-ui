import React from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';

import TermItem from './term-item';

const StyledTable = styled(Table)`
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

function SetTermsTable({ setId, terms }) {
  return (
    <StyledTable striped bordered hover size="sm">
      <thead>
      <tr>
        <th>#</th>
        <th>Выражение</th>
        <th className="translations">Перевод</th>
      </tr>
      </thead>
      <tbody>
      {
        terms.map((term, i) => (
          <TermItem
            key={i}
            index={terms.length - i}
            setId={setId}
            object={term}
          />
        ))
      }
      </tbody>
    </StyledTable>
  );
}

export default SetTermsTable;

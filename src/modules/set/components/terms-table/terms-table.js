import React from 'react';

import { StyledTable } from './terms-table.style';
import TermRow from './term-row';


function TermsTable({ setId, terms }) {
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
          <TermRow
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

export default TermsTable;

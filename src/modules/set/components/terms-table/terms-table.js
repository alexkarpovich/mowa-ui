import React from 'react';

import { StyledTable } from './terms-table.style';
import TermPreviewRow from './term-preview-row';


function TermsTable({ setId, terms }) {
  return (
    <StyledTable bordered size="sm">
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
          <TermPreviewRow
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

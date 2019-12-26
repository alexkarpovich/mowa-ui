import React from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';

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

const StyledTranslation = styled.div`
  line-height: 1;
  margin-left: 10px;
  position: relative;

  &:before {
    content: "-";
    color: #b1b1b1;
    position: absolute;
    left: -10px;
  }

  .details {
    font-size: 0.8em;
    color: #666;
    padding-left: 5px;
    border-left: 2px solid #666;
  }
`;

const TranslationItem = ({ translation }) => (
  <StyledTranslation>
    <div>{translation.value}</div>
    <div className="details">{translation.details}</div>
  </StyledTranslation>
);

function SetTermsTable({ terms }) {
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
          <tr key={i} className="term">
            <td>{terms.length - i}</td>
            <td>
              <div className="value">{term.value}</div>
              <div className="transcription">{term.transcription}</div>
            </td>
            <td>
              {term.translations.map((trans, i) => (
                <TranslationItem key={i} translation={trans}/>
              ))}
            </td>
          </tr>
        ))
      }
      </tbody>
    </StyledTable>
  );
}

export default SetTermsTable;

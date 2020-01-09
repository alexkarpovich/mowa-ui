import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCardAsking = styled(Card)`
  & > .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .translation {
      font-size: 2em;
    }
  }
`;

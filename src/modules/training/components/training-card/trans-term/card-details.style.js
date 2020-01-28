import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCardDetails = styled(Card)`
  & > .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .term {
     font-size: 2em;
     font-family: KaiTi;
    }
  }
`;

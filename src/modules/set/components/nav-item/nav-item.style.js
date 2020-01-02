import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';

export const StyledNavItem = styled(ListGroup.Item)`
  display: flex;
  padding: 5px 10px;
  outline: none !important;

  & > .content {
    width: 100%;

    & > .name {
      font-weight: bold;
    }

    & > .count {
      font-size: 0.7em;
    }
  }
`;

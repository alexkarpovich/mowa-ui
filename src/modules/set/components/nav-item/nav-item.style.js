import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';

export const StyledNavItem = styled(ListGroup.Item)`
  display: flex;
  padding: 5px 10px;
  position: relative;
  outline: none !important;

  & > .content {
    width: 100%;

    & > .name {
      font-size: 0.8em;
      font-weight: bold;
    }

    & > .count {
      font-size: 0.6em;
      font-style: italic;
    }
  }

  & > .actions {
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    color: #ff6000;
  }

  &:hover {
    .actions {
      visibility: visible;
    }
  }
`;

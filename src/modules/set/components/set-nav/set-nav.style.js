import styled from 'styled-components';

export const StyledSetNav =  styled.div`
  padding: 5px 0;
  background-color: #f8f9fa;

  .list-actions, .list-sub-actions {
    padding: 0 15px;
  }

  .list-actions {
    button {
      padding: 0;
      font-size: 0.7em;
      text-transform: uppercase

      &:not(:first-child) {
        margin-left: 3px;
      }
    }
  }
  .list-sub-actions {
    button {
      padding: 0;
      font-size: 0.7em;

      &:not(:first-child) {
        margin-left: 3px;
      }
    }
  }
`;

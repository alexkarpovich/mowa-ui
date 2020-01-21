import styled from 'styled-components';

export const StyledTranslationItem = styled.div`
  line-height: 1;
  margin-left: 10px;
  position: relative;

  &:hover {
    background-color: #f2f8ff;

    .actions {
      display: inherit;
    }
  }

  &:before {
    content: "-";
    color: #b1b1b1;
    position: absolute;
    left: -10px;
  }

  .actions {
    display: none;
    position: absolute;
    right: 5px;
    top: 0;

    & > .delete {
      cursor: pointer;
      color: #7c7c7d;
    }
  }

  .details {
    font-size: 0.8em;
    color: #666;
    padding-left: 5px;
    border-left: 2px solid #666;
  }
`;

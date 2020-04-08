import styled from 'styled-components';

export const StyledNavItem = styled.div`
  display: flex;
  padding: 5px 10px;
  margin: 0;
  position: relative;
  outline: none !important;
  background-color: ${props => props.active ? '#fff' : '#f8f9fa'}

  &:not(:first-child) {
    border-top: 1px solid #eaeaea;
  }

  & > .checkbox {
    margin-right: 5px;
  }

  & > .content {
    width: 100%;
    cursor: pointer;

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
    color: #7c7c7d;
    line-height: 1.2;
  }

  &:hover {
    .actions {
      cursor: pointer;
      visibility: visible;
    }
  }
`;

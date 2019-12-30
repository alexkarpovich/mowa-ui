import styled from 'styled-components';

export const StyledCardAsking = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > .content {
    text-align: center;

    .translation {
      font-size: 2em;
    }
  }

  & > .show-btn {
    text-transform: uppercase;
  }
`;

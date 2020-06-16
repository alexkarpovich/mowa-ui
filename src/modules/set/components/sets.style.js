import styled from 'styled-components';

export const SetSpan = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;

export const AddSetBtn = styled.span`
  padding: 3px 5px;
  color: green;

  &:hover {
      color: red;
  }
`;

export const StyledSetsPage = styled.div`
  .set-view-container {
    margin-left: 250px;
    padding: 0 10px;
  }

  @media (max-width: 768px) {
    .set-view-container {
      margin: 0;
    }
  }
`;

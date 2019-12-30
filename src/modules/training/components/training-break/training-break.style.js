import styled from 'styled-components';

export const StyledTrainingBreak = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .content {
    background-color: #3a3a3a;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    border-radius: 200px;
    border: 10px solid #4ab461;

    & > div > button {
      text-transform: uppercase;
    }
  }
`;

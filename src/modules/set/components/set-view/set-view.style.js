import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const NewWordInput = styled(Form.Control)`
    margin: 10px;
    width: 50%;
`;

export const TrainingButtons = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;

  button {
    width: 36px;
    height: 36px;
    border-radius: 18px;

    &:not(:first-child) {
      margin-left: 5px;
    }
  }
`;

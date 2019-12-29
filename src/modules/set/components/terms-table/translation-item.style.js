import styled from 'styled-components';

export const StyledTranslationItem = styled.div`
  line-height: 1;
  margin-left: 10px;
  position: relative;

  &:before {
    content: "-";
    color: #b1b1b1;
    position: absolute;
    left: -10px;
  }

  .details {
    font-size: 0.8em;
    color: #666;
    padding-left: 5px;
    border-left: 2px solid #666;
  }
`;

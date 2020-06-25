import styled from 'styled-components';

export const StyledCircularProgressBar = styled.div`
    .svg{
        display: block;
        max-width: 100%;
    }
    
    .svg-circle-bg, .svg-circle, .svg-inner-circle-bg, .svg-inner-circle {
        fill: none;
    }

    .svg-circle-text {
        font-size: 0.6rem;
        text-anchor: middle;
        fill: #000;
        font-weight: bold;
    }
`;
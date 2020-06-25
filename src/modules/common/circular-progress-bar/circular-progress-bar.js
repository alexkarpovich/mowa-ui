import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { StyledCircularProgressBar } from './circular-progress-bar.styled';

const CircularProgressBar = ({
    type,
    size,
    local,
    overall,
    strokeWidth,
}) => {
    const [overallOffset, setOverallOffset] = useState(0);
    const [localOffset, setLocalOffset] = useState(0);
    const overallCircleRef = useRef(null);
    const localCircleRef = useRef(null);

    const center = size / 2;
    const overallRadius = size / 2 - strokeWidth / 2;
    const localRadius = overallRadius - strokeWidth - 2;
    const circumference = [2 * Math.PI * overallRadius, 2 * Math.PI * localRadius];

    useEffect(() => {
        setOverallOffset(((100 - overall) / 100) * circumference[0]);
        setLocalOffset(((100 - local) / 100) * circumference[1]);

        overallCircleRef.current.style = 'transition: stroke-dashoffset 1000ms ease-in-out';
        localCircleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out';

    }, [setOverallOffset, setLocalOffset, local, overall, circumference, overallOffset, localOffset]);

    return (
        <StyledCircularProgressBar>
            <svg className="svg" width={size} height={size}>
                <circle
                    className="svg-circle-bg"
                    stroke='#ececec'
                    cx={center}
                    cy={center}
                    r={overallRadius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="svg-circle"
                    ref={overallCircleRef}
                    stroke='#01a59a'
                    cx={center}
                    cy={center}
                    r={overallRadius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference[0]}
                    strokeDashoffset={overallOffset}
                />
                <circle
                    className="svg-inner-circle-bg"
                    stroke='#ececec'
                    cx={center}
                    cy={center}
                    r={localRadius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="svg-inner-circle"
                    ref={localCircleRef}
                    stroke='#f3a424'
                    cx={center}
                    cy={center}
                    r={localRadius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference[1]}
                    strokeDashoffset={localOffset}
                />
                <text 
                    x={`${center}`} 
                    y={`${center - 4}`} 
                    className="svg-circle-text">
                        {local}
                </text>
                <line 
                    x1={10} 
                    y1={center} 
                    x2={size - 10} 
                    y2={center} 
                    stroke="black" 
                />
                <text 
                    x={`${center}`} 
                    y={`${center + 12}`} 
                    className="svg-circle-text">
                        {overall}
                </text>
            </svg>
        </StyledCircularProgressBar>
    );
}

CircularProgressBar.defaultTypes = {
    type: 0,
};

CircularProgressBar.propTypes = {
    type: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    local: PropTypes.number.isRequired,
    overall: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
}

export default CircularProgressBar;

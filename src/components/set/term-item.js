import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styled from 'styled-components';
import TermTranslations from "./term-translations";

const Term = styled.div`
    background-color: #f7fbff;
    box-shadow: 0 2px 2px rgba(100,100,100,0.2);
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #f9f9f9;

    &.w1 {
        width: 80px;
    }

    &.w2 {
        width: 160px;
    }

    & > .value {
        display: flex;
        font-size: 20px;
        justify-content: center;
    }
`;

const TranslationItem = styled.div`
    font-size: 11px;
    line-height: 1;

    & > .value {
        color: green;
    }

    & > .details {
        color: gray;
        padding-left: 5px;
        border-left: 2px solid gray;
    }
`;

function TermItem(props) {
    const {item} = props;
    const overlayRef = useRef(null);

    const popover = (
        <Popover position="bottom">
            <Popover.Content>
              <TermTranslations
                id={item.id}
                defaultValues={item.translations}
                onClose={() => overlayRef.current.hide()}
              />
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger
            ref={overlayRef}
            trigger="click"
            placement="bottom"
            overlay={popover}
        >
            <Term>
                <div className="value">{item.value}</div>
                <div className="translations">
                {
                    item.translations.map(tr => (
                    <TranslationItem key={tr.id}>
                        <div className="transcription">{tr.transcription}</div>
                        <div className="value">{tr.value}</div>
                        <div className="details">{tr.details}</div>
                    </TranslationItem>
                    ))
                }
                </div>
            </Term>
        </OverlayTrigger>
    );
}

TermItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        translations: PropTypes.array,
    }).isRequired,
};


export default TermItem;

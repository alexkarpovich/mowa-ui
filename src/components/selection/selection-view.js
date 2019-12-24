import React, { useState, useRef, Fragment, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Row, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import { SELECTION_TERMS, ADD_SELECTION_TERM } from '../../graphql/selection';
import TermItem from './term-item';
import { ACCOUNT_SELECTIONS_FRAGMENT } from '../../graphql/account';

const NewWordInput = styled(Form.Control)`
    margin: 10px;
    width: 50%;
`;

function SelectionView({ id }) {
    const termsRef = useRef();
    const [term, setTerm] = useState('');
    const { loading, data } = useQuery(SELECTION_TERMS, {
        variables: { id }
    });
    const [addSelectionTerm] = useMutation(ADD_SELECTION_TERM, {
        variables: { id, text: term },
        update(proxy, { data: res }) {
            let root = proxy.readQuery({
                query: SELECTION_TERMS,
                variables: { id }
            });

            root.selectionTerms.push(res.addSelectionTerm);
            proxy.writeData({ 
                query: SELECTION_TERMS, 
                variables: { id },  
                data: root
            });

            root = proxy.readFragment({ id, fragment: ACCOUNT_SELECTIONS_FRAGMENT });
            root.count++;
            proxy.writeFragment({ id, fragment: ACCOUNT_SELECTIONS_FRAGMENT, data: {...root} })
        }
    });

    const options = {
        columnWidth: 15,
        gutter: 10,
    };

    useLayoutEffect(() => {
        if (termsRef.current) {
            const items = termsRef.current.firstChild.children;
            for (let i=0; i<items.length; i++) {
                items[i].className += items[i].offsetWidth < 80 ? ' w1' : ' w2';                
            }
        }
    });

    function onKeyUp(target) {
        if (target.key === 'Enter') {
            addSelectionTerm();
            setTerm('');
        }
    }

    return (
        <Fragment>
            <Row>
                <Col className="d-flex justify-content-center">
                    <NewWordInput
                        name="term"
                        placeholder="Введите выражение..."
                        value={term}
                        onKeyUp={onKeyUp}
                        onChange={e => setTerm(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col ref={termsRef} >
                    <Masonry options={options}>
                    { 
                        !loading && data && data.selectionTerms.map((item) => (
                            <TermItem 
                                key={item.id}
                                item={item}
                            />
                        ))
                    }
                    </Masonry>
                </Col>
            </Row>
        </Fragment>
              
    );
}

SelectionView.propTypes = {
    id: PropTypes.string.isRequired,
};



export default SelectionView;

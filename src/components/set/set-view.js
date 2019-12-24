import React, { useState, useRef, Fragment, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Row, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import { SET_TERMS, ATTACH_TERM } from '../../graphql/set';
import TermItem from './term-item';
import { SET_FRAGMENT } from '../../graphql/account';

const NewWordInput = styled(Form.Control)`
    margin: 10px;
    width: 50%;
`;

function SetView({ id }) {
    const termsRef = useRef();
    const [term, setTerm] = useState('');
    const { loading, data } = useQuery(SET_TERMS, {
        variables: { id }
    });
    const [attachTerm] = useMutation(ATTACH_TERM, {
        variables: { id, text: term },
        update(proxy, { data: res }) {
            let root = proxy.readQuery({
                query: SET_TERMS,
                variables: { id }
            });

            root.terms.push(res.attachTerm);
            proxy.writeData({
                query: SET_TERMS,
                variables: { id },
                data: root
            });

            root = proxy.readFragment({ id, fragment: SET_FRAGMENT });
            root.count++;
            proxy.writeFragment({ id, fragment: SET_FRAGMENT, data: {...root} })
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
            attachTerm();
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
                        !loading && data && data.terms.map((item) => (
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

SetView.propTypes = {
    id: PropTypes.string.isRequired,
};



export default SetView;

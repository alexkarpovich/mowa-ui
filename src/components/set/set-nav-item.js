import { cloneDeep, findIndex } from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Form, ListGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { SETS_QUERY } from '../../graphql/account';
import { DELETE_SET } from '../../graphql/set';

function SetNavItem(props) {
    const {item, onClick} = props;
    const [isEditing, setEditing] = useState(!item.id);
    const [newName, setNewName] = useState(item.name);
    const [editSet] = useMutation(EDIT_SET, {
        variables: { id: item.id, name: newName },
        update(proxy) {
            const data = cloneDeep(proxy.readQuery({
                query: SETS_QUERY
            }));
            var index = findIndex(data.accountSelections, { id: item.id });
            data.accountSelections[index].name = newName;

            proxy.writeData({ query: SETS_QUERY, data });
        }
    });

    const [deleteSet] = useMutation(DELETE_SET, {
        variables: { id: item.id },
        update(proxy) {
            const root = cloneDeep(proxy.readQuery({ query: SETS_QUERY }));
            root.accountSelections = root.accountSelections.filter(el => el.id !== item.id);

            proxy.writeData({ query: SETS_QUERY, data: root });
        }
    });

    function onKeyUp(target) {
        if (target.key === 'Enter') {
            setEditing(false);
            editSet();
        } else if (target.key === 'Escape') {
            setEditing(false);
        }
    }

    return (
        <ListGroup.Item action eventKey={item.id} onClick={onClick}>
            { !isEditing ? (
                <Row>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <Row>
                            <Col>{item.name}</Col>
                        </Row>
                        <Row>
                            <Col>{item.count} слов</Col>
                        </Row>
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2}>
                        <FontAwesomeIcon icon={faTrash} size="sm" onClick={deleteSet} />
                        <FontAwesomeIcon icon={faEdit} size="sm" onClick={() => setEditing(true) } />
                    </Col>
                </Row>
            ) : (
                <Form.Control
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyUp={onKeyUp}
                />
            )}

        </ListGroup.Item>
    );
}

SetNavItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
    }),
    onClick: PropTypes.func,
};

const EDIT_SET = gql`
mutation EditSet($id: ID!, $name: String!) {
    editSet(id: $id, name: $name)
}
`;

export default SetNavItem;

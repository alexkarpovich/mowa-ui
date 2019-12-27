import { cloneDeep, findIndex } from 'lodash';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Form, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { SETS_QUERY } from '../../graphql/account';
import { DELETE_SET, SET_FRAGMENT } from '../../graphql/set';

const NavItem = styled(ListGroup.Item)`
  display: flex;
  padding: 10px;
  outline: none !important;

  & > .content {
    width: 100%;

    & > .name {
      font-weight: bold;
    }

    & > .count {
      font-size: 0.7em;
    }
  }
`;

function SetNavItem(props) {
  const { ids, item, onClick } = props;
  const isSelected = ids.indexOf(item.id) !== -1;
  const [isEditing, setEditing] = useState(!item.id);
  const [newName, setNewName] = useState(item.name);
  const [editSet] = useMutation(EDIT_SET, {
    variables: { id: item.id, name: newName },
    update(proxy) {
      const root = proxy.readFragment({ id: item.id, fragment: SET_FRAGMENT });
      proxy.writeFragment({
        id: item.id,
        fragment: SET_FRAGMENT,
        data: { ...root, name: newName }
      });
    }
  });

  const [deleteSet] = useMutation(DELETE_SET, {
    variables: { id: item.id },
    update(proxy) {
      const root = cloneDeep(proxy.readQuery({ query: SETS_QUERY }));
      root.sets = root.sets.filter(el => el.id !== item.id);

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
    <NavItem action active={isSelected} onClick={onClick}>
      {!isEditing ? (
        <Fragment>
          <div className="content">
            <div className="name">{item.name}</div>
            <div className="count">{`${item.count} выражений`}</div>
          </div>
          <div className="actions">
            <FontAwesomeIcon icon={faTrash} size="sm" onClick={deleteSet}/>
            <FontAwesomeIcon icon={faEdit} size="sm" onClick={() => setEditing(true)}/>
          </div>
        </Fragment>
      ) : (
        <Form.Control
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyUp={onKeyUp}
        />
      )}
    </NavItem>
  );
}

SetNavItem.propTypes = {
  ids: PropTypes.array.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }),
  onClick: PropTypes.func
};

const EDIT_SET = gql`
  mutation EditSet($id: ID!, $name: String!) {
    editSet(id: $id, name: $name)
  }
`;

export default SetNavItem;

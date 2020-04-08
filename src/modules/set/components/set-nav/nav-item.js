import { cloneDeep } from 'lodash';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { SETS_QUERY } from 'graphql/schemas/account';
import { EDIT_SET, DELETE_SET, SET_FRAGMENT } from 'graphql/schemas/set';
import { StyledNavItem } from './nav-item.style';
import { MODE_SELECT, MODE_VIEW } from "./set-nav.const";

function NavItem(props) {
  const { mode, item, isActive, isSelected, onClick } = props;
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
    <StyledNavItem active={isActive} onClick={onClick}>
      {!isEditing ? (
        <Fragment>
          <div className="checkbox">
            { mode === MODE_SELECT && (
              <input readOnly type="checkbox" checked={isSelected} />
            ) }
          </div>

          <div className="content">
            <div className="name">{item.name}</div>
            <div className="count">{`${item.count} выражений`}</div>
          </div>
          <div className="actions">
            <FontAwesomeIcon icon={faTrash} size="xs" onClick={deleteSet}/>
            <FontAwesomeIcon icon={faEdit} size="xs" onClick={() => setEditing(true)}/>
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
    </StyledNavItem>
  );
}

NavItem.propTypes = {
  mode: PropTypes.oneOf([MODE_VIEW, MODE_SELECT]),
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }),
  isActive: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default NavItem;

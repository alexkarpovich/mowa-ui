import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import queryString from 'query-string';

import { randomString } from '../../utils/set.utils';
import { MODE_VIEW, MODE_SELECT } from "./set-nav.const";
import { ADD_SET } from 'graphql/schemas/account';
import { CLONE_SET, UNSHIFT_SET } from 'graphql/schemas/set';
import { StyledSetNav } from "./set-nav.style";
import NavItem from "./nav-item";

function SetNav({ sets, active }) {
  const [mode, setMode] = useState(MODE_VIEW);
  const [selected, setSelected] = useState(active);
  const history = useHistory();

  const [unshiftSet] = useMutation(UNSHIFT_SET);
  const [addSet] = useMutation(ADD_SET, {
    variables: { name: randomString() },
    update(proxy, { data: res }) {
      unshiftSet({ variables: { set: res.addSet } });
    }
  });
  const [cloneSet] = useMutation(CLONE_SET, {
    variables: { ids: selected, name: randomString() },
    update(proxy, { data: res }) {
      unshiftSet({ variables: { set: res.cloneSet } });

      setMode(MODE_VIEW);

      history.push({
        path: '/sets',
        search: queryString.stringify({ ids: [res.cloneSet.id] }, { arrayFormat: 'bracket' })
      });
    }
  });

  function toggleMode() {
    if (mode === MODE_SELECT) {
      setSelected(active);
    }

    setMode(mode === MODE_SELECT ? MODE_VIEW : MODE_SELECT);
  }

  function itemClicked(setId) {
    if (mode === MODE_SELECT) {
      const ids = new Set(selected);

      ids.has(setId) ? ids.delete(setId) : ids.add(setId);
      setSelected([...ids]);

    } else if (mode === MODE_VIEW) {
      const ids = [setId];
      setSelected(ids);

      history.push({
        path: '/sets',
        search: queryString.stringify({ ids }, { arrayFormat: 'bracket' })
      });
    }
  }

  function viewSelected() {
    setMode(MODE_VIEW);

    history.push({
      path: '/sets',
      search: queryString.stringify({ ids: selected }, { arrayFormat: 'bracket' })
    });
  }

  function selectAll() {
    const allIds = sets.map(set => set.id);
    setSelected(allIds);
  }

  return (
    <StyledSetNav>
      <div className="list-actions">
        <Button variant="link" onClick={toggleMode}>{mode === MODE_VIEW ? 'выбрать' : 'отменить'}</Button>
        { mode === MODE_VIEW && (
          <Button variant="link" onClick={addSet}>добавить</Button>
        ) }
      </div>
      <div className="list-sub-actions">
        { mode === MODE_SELECT && (
          <Fragment>
            <Button variant="link" onClick={selectAll}>все</Button>
            <Button variant="link" onClick={viewSelected}>показать</Button>
            <Button variant="link" onClick={cloneSet}>клон</Button>
            <Button variant="link" onClick={() => {}}>удалить</Button>
          </Fragment>
        ) }
      </div>
      <div className="set-list">
        { sets.map((set, i) => (
          <NavItem
            key={i}
            mode={mode}
            item={set}
            isActive={active.indexOf(set.id) !== -1}
            isSelected={selected.indexOf(set.id) !== -1}
            onClick={() => itemClicked(set.id)}
          />
        ))}
      </div>
    </StyledSetNav>
  );
}

SetNav.propTypes = {
  sets: PropTypes.array.isRequired,
  active: PropTypes.array.isRequired,
};

export default SetNav;

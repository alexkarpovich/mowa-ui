import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { SETS_QUERY, ADD_SET } from 'graphql/schemas/account';
import { UNSHIFT_SET } from 'graphql/schemas/set';
import { selectedSetIds } from "../utils/set.utils";
import SetView from '../components/set-view/set-view';
import SetNavItem from '../components/nav-item/nav-item';
import { AddSetBtn, SetSpan} from '../components/sets.style';

function SetsPage() {
  const [ids, setIds] = useState([]);
  const { loading, data } = useQuery(SETS_QUERY);
  const [unshiftSet] = useMutation(UNSHIFT_SET);
  const [addSet] = useMutation(ADD_SET, {
    variables: { name: 'Безымянный набор' },
    update(proxy, { data: res }) {
      unshiftSet({ variables: { set: res.addSet } });
    }
  });

  async function pickSelection(id, event) {
    if (event.shiftKey && ids.length) {
      setIds(selectedSetIds(ids, id, data.sets));
    } else if (event.ctrlKey) {
      setIds([...ids, id]);
    } else {
      setIds([id]);
    }
  }

  return (
    <div className="sets">
      <Row>
        <Col sm={3}>
          <Row>
            <Col>
              <SetSpan>Наборы</SetSpan>
              <AddSetBtn>
                <FontAwesomeIcon icon={faPlusCircle} onClick={addSet}/>
              </AddSetBtn>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {
                  !loading && data.sets.map((item) => (
                    <SetNavItem
                      key={item.id}
                      ids={ids}
                      item={item}
                      onClick={(event) => pickSelection(item.id, event)}
                    />
                  ))
                }
              </ListGroup>
            </Col>
          </Row>

        </Col>
        <Col sm={9}>
          { ids.length ? (
            <SetView ids={ids} />
          ) : (
            <div>
              Выберите набор.
            </div>
          ) }
        </Col>
      </Row>
    </div>
  );
}

export default SetsPage;

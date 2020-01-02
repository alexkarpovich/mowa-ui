import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { SETS_QUERY, ADD_SET } from 'graphql/schemas/account';
import SetView from '../components/set-view/set-view';
import SetNavItem from '../components/nav-item/nav-item';
import { AddSetBtn, SetSpan} from '../components/sets.style';
import { UNSHIFT_SET } from 'graphql/schemas/set';

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

  async function pickSelection(id, shouldAppend) {
    setIds(shouldAppend ? [...ids, id] : [id]);
  }

  return (
    <div className="selections">
      { loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
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
                    data.sets.map((item) => (
                      <SetNavItem
                        key={item.id}
                        ids={ids}
                        item={item}
                        onClick={(event) => pickSelection(item.id, event.shiftKey)}
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
      ) }

    </div>
  );
}

export default SetsPage;

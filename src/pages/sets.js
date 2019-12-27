import React, { useState } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

import { SETS_QUERY, ADD_SET } from '../graphql/account';
import SetView from '../components/set/set-view';
import SetNavItem from '../components/set/set-nav-item';

const SetSpan = styled.span`
    font-weight: bold;
    text-transform: uppercase;
`;

const AddSetBtn = styled.span`
    padding: 3px 5px;

    &:hover {
        color: green;
    }
`;

function SetsPage() {
    const [ids, setIds] = useState([]);
    const { loading, data } = useQuery(SETS_QUERY);
    const client = useApolloClient();
    const [addSet] = useMutation(ADD_SET, {
        variables: { name: 'Безымянный набор' },
        update(proxy, { data: res }) {
            const root = proxy.readQuery({ query: SETS_QUERY });
            root.sets = [res.addSet, ...root.sets];
            proxy.writeData({ query: SETS_QUERY, data: root });
        }
    });

    async function pickSelection(id, shouldAppend) {
      await client.resetStore();

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

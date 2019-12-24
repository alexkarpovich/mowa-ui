import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

import { ACCOUNT_SELECTIONS_QUERY, ADD_ACCOUNT_SELECTION } from '../graphql/account';
import SelectionView from '../components/selection/selection-view';
import SelectionNavItem from '../components/selection/selection-nav-item';

const SelectionSpan = styled.span`
    font-weight: bold;
    text-transform: uppercase;
`;

const AddSelectionBtn = styled.span`
    padding: 3px 5px;

    &:hover {
        color: green;
    }
`;

function SelectionsPage() {
    const [activeItem, setActiveItem] = useState('');
    const { loading, data } = useQuery(ACCOUNT_SELECTIONS_QUERY);
    const [addAccountSelection] = useMutation(ADD_ACCOUNT_SELECTION, {
        variables: { name: 'Безымянный набор' },
        update(proxy, { data: res }) {
            const root = proxy.readQuery({ query: ACCOUNT_SELECTIONS_QUERY });
            root.accountSelections = [res.addAccountSelection, ...root.accountSelections];
            proxy.writeData({ query: ACCOUNT_SELECTIONS_QUERY, data: root });
        }
    });

    function pickSelection(id) {
        console.log(id)
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
                                <SelectionSpan>Наборы</SelectionSpan>
                                <AddSelectionBtn>
                                    <FontAwesomeIcon icon={faPlusCircle} onClick={addAccountSelection}/>
                                </AddSelectionBtn>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ListGroup activeKey={activeItem} onSelect={key => setActiveItem(key)}>
                                { 
                                    data.accountSelections.map((item) => (
                                        <SelectionNavItem 
                                            key={item.id}
                                            item={item}
                                            onClick={() => pickSelection(item.id)}
                                        />
                                    )) 
                                }                                       
                                </ListGroup>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col sm={9}>
                        { activeItem ? (
                            <SelectionView id={activeItem} />
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

export default SelectionsPage;

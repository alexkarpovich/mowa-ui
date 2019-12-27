import React, { useState, useRef, Fragment, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { TERMS, ATTACH_TERM, SET_FRAGMENT } from '../../graphql/set';
import SetTermsTable from './set-terms-table';

const NewWordInput = styled(Form.Control)`
    margin: 10px;
    width: 50%;
`;

function SetView({ ids }) {
  const id = ids[0];
  const [term, setTerm] = useState('');
  const { loading, data } = useQuery(TERMS, {
    variables: { ids }
  });
  const [attachTerm] = useMutation(ATTACH_TERM, {
    variables: { id, value: term },
    update(proxy, { data: res }) {
      let root = proxy.readQuery({
        query: TERMS,
        variables: { ids }
      });

      root.terms.unshift(res.attachTerm);
      proxy.writeData({
        query: TERMS,
        variables: { ids },
        data: root
      });

      root = proxy.readFragment({ id, fragment: SET_FRAGMENT });
      root.count++;
      proxy.writeFragment({ id, fragment: SET_FRAGMENT, data: { ...root } });
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
        <Col>
          {data && <SetTermsTable setId={id} terms={data.terms}/>}
        </Col>
      </Row>
    </Fragment>
  );
}

SetView.propTypes = {
  ids: PropTypes.array.isRequired
};


export default SetView;

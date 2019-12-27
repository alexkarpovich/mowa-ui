import React, { useState, useRef, Fragment, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { SET_TERMS, ATTACH_TERM } from '../../graphql/set';
import { SET_FRAGMENT } from '../../graphql/account';
import SetTermsTable from './set-terms-table';

const NewWordInput = styled(Form.Control)`
    margin: 10px;
    width: 50%;
`;

function SetView({ id }) {
  const [term, setTerm] = useState('');
  const { loading, data } = useQuery(SET_TERMS, {
    variables: { id }
  });
  const [attachTerm] = useMutation(ATTACH_TERM, {
    variables: { id, value: term },
    update(proxy, { data: res }) {
      let root = proxy.readQuery({
        query: SET_TERMS,
        variables: { id }
      });

      root.terms.unshift(res.attachTerm);
      proxy.writeData({
        query: SET_TERMS,
        variables: { id },
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
  id: PropTypes.string.isRequired
};


export default SetView;

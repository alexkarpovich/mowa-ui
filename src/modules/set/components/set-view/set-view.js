import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Row, Col, Spinner } from 'react-bootstrap';

import { TERMS, ATTACH_TERM, UNSHIFT_TERM } from 'graphql/schemas/set';
import { ENSURE_TRAINING } from 'graphql/schemas/training';
import TermsTable from '../terms-table/terms-table';
import { NewWordInput, TrainingButtons} from './set-view.style';


function SetView({ ids }) {
  const id = ids[0];
  const history = useHistory();
  const [term, setTerm] = useState('');
  const { loading, data } = useQuery(TERMS, {
    variables: { ids },
    fetchPolicy: 'network-only',
  });
  const [unshiftTerm] = useMutation(UNSHIFT_TERM);
  const [attachTerm] = useMutation(ATTACH_TERM, {
    variables: { id, value: term },
    update(proxy, { data: res }) {
      unshiftTerm({
        variables: { setId: id, term: res.attachTerm }
      })
    }
  });
  const [ensureTraining] = useMutation(ENSURE_TRAINING);

  function startTraining(type) {
    ensureTraining({
      variables: { type, setIds: ids },
      update(_, { data: res}) {
        history.push(`/training/${res.ensureTraining.id}`)
      }
    }).catch(err => console.log(err));
  }

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
          { ids.length === 1 && (
            <NewWordInput
              name="term"
              placeholder="Введите выражение..."
              value={term}
              onKeyUp={onKeyUp}
              onChange={e => setTerm(e.target.value)}
            />
          )}

          <TrainingButtons>
            <Button variant="primary" onClick={() => startTraining(0)}>I</Button>
            <Button variant="primary">II</Button>
            <Button variant="primary">III</Button>
          </TrainingButtons>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            loading ? (
              <Spinner variant="primary" animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <TermsTable setId={id} terms={data.terms} />
            )
          }
        </Col>
      </Row>
    </Fragment>
  );
}

SetView.propTypes = {
  ids: PropTypes.array.isRequired
};


export default SetView;

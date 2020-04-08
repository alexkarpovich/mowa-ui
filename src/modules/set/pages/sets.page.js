import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { SETS_QUERY } from 'graphql/schemas/account';
import { selectedSetIds } from "../utils/set.utils";
import SetView from '../components/set-view/set-view';
import SetNav from "../components/set-nav/set-nav";

function SetsPage() {
  const [ids, setIds] = useState([]);
  const { loading, data } = useQuery(SETS_QUERY);
  const query = queryString.parse(useLocation().search, { arrayFormat: 'bracket' });

  console.log(query);

  return (
    <div className="sets">
      <Row>
        <Col sm={3}>
          { data && (
            <SetNav
              sets={data.sets}
              active={query.ids || []}
            />
            )
          }
        </Col>
        <Col sm={9}>
          { query.ids && query.ids.length ? (
            <SetView ids={query.ids} />
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

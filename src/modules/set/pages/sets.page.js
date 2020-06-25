import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { SETS_QUERY } from 'graphql/schemas/account';
import { StyledSetsPage } from '../components/sets.style';
import SetView from '../components/set-view/set-view';
import SetNav from "../components/set-nav/set-nav";

function SetsPage() {
  const { data } = useQuery(SETS_QUERY);
  const query = queryString.parse(useLocation().search, { arrayFormat: 'bracket' });

  return (
    <StyledSetsPage className="sets">
      <div className="set-nav-container">
        { data && (
          <SetNav
            sets={data.sets}
            active={query.ids || []}
          />
        ) }
      </div>
      <div className="set-view-container">
        { query.ids && query.ids.length ? (
          <SetView ids={query.ids} />
        ) : (
          <div>
            Выберите набор.
          </div>
        ) }
      </div>
    </StyledSetsPage>
  );
}

export default SetsPage;

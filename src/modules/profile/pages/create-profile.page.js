import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'react-bootstrap';

import { LANGUAGES_QUERY } from 'graphql/schemas/language';
import CreateProfileForm from '../components/create-profile/create-profile.form';

function CreateProfilePage() {
  const { loading, data } = useQuery(LANGUAGES_QUERY);

  return (
    <div className="create-profile">
      { loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <CreateProfileForm languages={data.languages} />
      ) }

    </div>
  );
}

export default CreateProfilePage;

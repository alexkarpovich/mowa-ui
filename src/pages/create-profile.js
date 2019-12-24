import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'react-bootstrap';

import CreateProfileForm from '../components/profile/create-profile-form';

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

const LANGUAGES_QUERY = gql`
{    
    languages {
        id
        name
        code
    }
}
`;

export default CreateProfilePage;

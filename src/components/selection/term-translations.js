import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';

import { ACCOUNT_SEARCH_TRANSLATIONS_QUERY } from "../../graphql/account";
import { ADD_SELECTION_TRANSLATIONS } from "../../graphql/selection";

const TermTranslationsView = styled.div`
  width: 250px;
`;

function TermTranslations(props) {
    const { defaultValues, onClose } = props;
    const [searchText, setSearchText] = useState('');
    const { loading, data } = useQuery(ACCOUNT_SEARCH_TRANSLATIONS_QUERY, {
      variables: { text: searchText }
    });
    const addSelectionTranslations = useMutation(ADD_SELECTION_TRANSLATIONS);

    const handleChange = (newValue, actionMeta) => {
        console.log(newValue, actionMeta);
    };

    const handleTypeTranslation = (inputValue, actionMeta) => {
        setSearchText(inputValue);
    };

    return (
      <TermTranslationsView>
        <CreatableSelect
          isClearable
          isLoading={loading}
          onChange={handleChange}
          onInputChange={handleTypeTranslation}
          options={data && data.accountSearchTranslations.map(x => ({value: x.id, label: x.text})) || []}
        />

        <div className="default-values">
          {
            defaultValues.map(obj => (
              <div key={obj.id}>{`${obj.text} /* ${obj.details} */`}</div>
            ))
          }
        </div>

        <Button onClick={onClose}>Закрыть</Button>
      </TermTranslationsView>
    );
}

TermTranslations.propTypes = {
  id: PropTypes.string.isRequired,
  defaultValues: PropTypes.array.isRequired,
  onClose: PropTypes.func
};


export default TermTranslations;

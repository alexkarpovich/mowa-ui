import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';

import { SEARCH_TRANSLATIONS_QUERY } from "../../graphql/account";
import { ATTACH_TRANSLATION } from "../../graphql/set";

const TermTranslationsView = styled.div`
  width: 250px;
`;

function TermTranslations(props) {
    const { defaultValues, onClose } = props;
    const [searchText, setSearchText] = useState('');
    const { loading, data } = useQuery(SEARCH_TRANSLATIONS_QUERY, {
      variables: { text: searchText }
    });
    const attachTranslation = useMutation(ATTACH_TRANSLATION);

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
          options={data && data.searchTranslations.map(x => ({value: x.id, label: x.text})) || []}
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

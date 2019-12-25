import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Button, Form } from 'react-bootstrap';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';

import { SEARCH_TRANSLATIONS_QUERY } from '../../graphql/account';
import { ATTACH_TRANSLATION } from '../../graphql/set';
import { TERM_FRAGMENT } from '../../graphql/term';

const TermTranslationsView = styled.div`
  width: 250px;
`;

function Input(props) {
  return (
    <div>
      <components.Input {...props} />
      <div>
        <Form.Control/>
        <Form.Control as="textarea" />
      </div>
    </div>
  );
};

function TermTranslations(props) {
    const { id, setId, defaultValues, onClose } = props;
    const [searchText, setSearchText] = useState('');
    const { loading, data } = useQuery(SEARCH_TRANSLATIONS_QUERY, {
      variables: { value: searchText }
    });
    const [attachTranslation] = useMutation(ATTACH_TRANSLATION);

    const handleChange = (newValue, actionMeta) => {
        if (!newValue) return;

        attachTranslation({
          variables: {
            input: {
              setId,
              termId: id,
              value: newValue.value,
              details: '',
              transcription: ''
            },
          },
          update(proxy, { data: res }) {
            let root = proxy.readFragment({ id, fragment: TERM_FRAGMENT });
            root.translations.push(res.attachTranslation);
            proxy.writeFragment({ id, fragment: TERM_FRAGMENT, data: {...root} })
          }
        }).catch(err => console.log(err));
    };

    const handleTypeTranslation = (inputValue, actionMeta) => {
        inputValue.length && setSearchText(inputValue);
    };

    return (
      <TermTranslationsView>
        <CreatableSelect
          isClearable
          isLoading={loading}
          onChange={handleChange}
          onInputChange={handleTypeTranslation}
          options={data && data.searchTranslations.map(x => ({value: x.id, label: x.value})) || []}
          components={{ Input }}
        />

        <div className="default-values">
          {
            defaultValues.map(obj => (
              <div key={obj.id}>{`${obj.value} /* ${obj.details} */`}</div>
            ))
          }
        </div>

        <Button onClick={onClose}>Закрыть</Button>
      </TermTranslationsView>
    );
}

TermTranslations.propTypes = {
  id: PropTypes.string.isRequired,
  setId: PropTypes.string.isRequired,
  defaultValues: PropTypes.array.isRequired,
  onClose: PropTypes.func
};


export default TermTranslations;

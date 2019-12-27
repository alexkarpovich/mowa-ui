import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Button, ButtonGroup,  Form } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';

import { SEARCH_TRANSLATIONS_QUERY } from '../../graphql/account';
import { ATTACH_TRANSLATION } from '../../graphql/set';
import { TERM_FRAGMENT } from '../../graphql/term';
import { useForm } from '../../util/hooks';

const TermTranslationsView = styled.div`
  width: 100%;

  .translation-select {
    margin-bottom: 15px;
  }
`;

function TermTranslations(props) {
    const { id, setId, onClose } = props;
    const [showExtended, setShowExtended] = useState(false);
    const { values, setValue, onChange, onSubmit } = useForm(triggerAttachTranslation, {
      setId,
      termId: id,
      id: null,
      value: '',
      transcription: '',
      details: ''
    });

    const { loading, data } = useQuery(SEARCH_TRANSLATIONS_QUERY, {
      variables: { termId: id, value: values.value }
    });
    const [attachTranslation] = useMutation(ATTACH_TRANSLATION, {
      variables: { input: values },
      update(proxy, { data: res }) {
        let root = proxy.readFragment({ id, fragment: TERM_FRAGMENT });
        root.translations.push(res.attachTranslation);
        proxy.writeFragment({ id, fragment: TERM_FRAGMENT, data: {...root} });
        setShowExtended(false);
      }
    });

    function triggerAttachTranslation() {
      attachTranslation().catch(e => console.log(e));
    }

    function handleChange(newValue) {
        if (!newValue) return;

        if (!newValue.__isNew__) {
          setValue('id', newValue.value);
          setTimeout(onSubmit, 0);
        } else {
          setShowExtended(true);
        }
    }

    function handleTypeTranslation(inputValue) {
        inputValue.length && setValue('value', inputValue);
    }

    return (
      <TermTranslationsView>
        <CreatableSelect
          isClearable
          className="translation-select"
          isLoading={loading}
          onChange={handleChange}
          onInputChange={handleTypeTranslation}
          options={data && data.searchTranslations.map(x => ({value: x.id, label: x.value})) || []}
        />

        { showExtended && (
          <Fragment>
            <Form.Group>
              <Form.Control
                name="transcription"
                placeholder="Укажите транскрипцию..."
                value={values.transcription}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="details"
                placeholder="Детали..."
                value={values.details}
                onChange={onChange}
                as="textarea"
              />
            </Form.Group>
          </Fragment>
        )}

        <ButtonGroup className="mr-2" aria-label="Display actions">
          <Button onClick={onClose}>Закрыть</Button>
        </ButtonGroup>

        { showExtended && (
          <ButtonGroup className="mr-2" aria-label="Display actions">
            <Button onClick={onSubmit}>Сохранить</Button>
          </ButtonGroup>
        )}
      </TermTranslationsView>
    );
}

TermTranslations.propTypes = {
  id: PropTypes.string.isRequired,
  setId: PropTypes.string.isRequired,
  onClose: PropTypes.func
};


export default TermTranslations;

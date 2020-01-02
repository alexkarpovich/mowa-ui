import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

import { SEARCH_TRANSLATIONS_QUERY } from 'graphql/schemas/account';
import { ATTACH_TRANSLATION } from 'graphql/schemas/set';
import { ADD_TRANSLATION } from 'graphql/schemas/term';
import { useForm } from 'util/hooks';
import { StyledTermTranslator } from './term-translator.style';

function TermTranslator(props) {
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
      variables: { termId: id, value: values.value },
      fetchPolicy: 'network-only',
    });
    const [addTranslation] = useMutation(ADD_TRANSLATION);
    const [attachTranslation] = useMutation(ATTACH_TRANSLATION, {
      variables: { input: values },
      update(proxy, { data: res }) {
        addTranslation({
          variables: { termId: id, translation: res.attachTranslation }
        });
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
        setValue('value', inputValue);
    }

    return (
      <StyledTermTranslator>
        <CreatableSelect
          autoFocus
          isClearable
          className="translation-select"
          isLoading={loading}
          onChange={handleChange}
          onInputChange={handleTypeTranslation}
          options={data ? data.searchTranslations.map(x => ({value: x.id, label: x.value})) : []}
        />

        { showExtended && (
          <Fragment>
            <Form.Group>
              <Form.Control
                autoFocus
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
      </StyledTermTranslator>
    );
}

TermTranslator.propTypes = {
  id: PropTypes.string.isRequired,
  setId: PropTypes.string.isRequired,
  onClose: PropTypes.func
};


export default TermTranslator;

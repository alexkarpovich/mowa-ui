import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'react-bootstrap';

import { useForm } from 'util/hooks';
import { ADD_PROFILE } from 'schemas/account';

function CreateProfileForm(props) {
  const { languages } = props;
  const { values, onChange, onSubmit } = useForm(addAccountProfile, {
    name: '',
    transLang: '',
    learnLang: ''
  });

  const [addProfile] = useMutation(ADD_PROFILE, {
    variables: {
      input: values
    },
    update(proxy, data) {
      console.log(data)
    }
  });

  function addAccountProfile() {
    addProfile();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="profile-add-name">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Введите название профиля..."
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group controlId="profile-add-native">
        <Form.Label>Родной язык</Form.Label>
        <Form.Control
          name="transLang"
          as="select"
          onChange={onChange}>
          { languages.map((item) => (
            <option key={item.code} value={item.code}>{item.name}</option>
          )) }
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="profile-add-foreign">
        <Form.Label>Иностранный язык</Form.Label>
        <Form.Control
          name="learnLang"
          as="select"
          onChange={onChange}>
          { languages.map((item) => (
            <option key={item.code} value={item.code}>{item.name}</option>
          )) }
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Создать
      </Button>
    </Form>
  );
}

CreateProfileForm.propTypes = {
  languages: PropTypes.array.isRequired,
};

export default CreateProfileForm;

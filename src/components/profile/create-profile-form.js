import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'react-bootstrap';

import { useForm } from '../../util/hooks';

function CreateProfileForm(props) {
    const { languages } = props;
    const { values, onChange, onSubmit } = useForm(addProfile, {
        name: '',
        nativeLanguageId: '',
        foreignLanguageId: ''
    });

    const [addAccountProfile] = useMutation(ADD_ACCOUNT_PROFILE, {
        variables: {
            input: values
        },
        update(proxy, data) {
            console.log(data)
        }
    });

    function addProfile() {
        addAccountProfile();
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
                    name="nativeLanguageId" 
                    as="select"
                    onChange={onChange}>
                    { languages.map((item) => (
                        <option key={item.code} value={item.id}>{item.name}</option>
                    )) }
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="profile-add-foreign">
                <Form.Label>Иностранный язык</Form.Label>
                <Form.Control 
                    name="foreignLanguageId" 
                    as="select"
                    onChange={onChange}>
                    { languages.map((item) => (
                        <option key={item.code} value={item.id}>{item.name}</option>
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

const ADD_ACCOUNT_PROFILE = gql`
mutation AddAccountProfile($input: ProfileCreateInput!) {
    addAccountProfile(input: $input)
}
`;

export default CreateProfileForm;

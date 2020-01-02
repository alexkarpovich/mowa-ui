import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from 'context/auth';
import { useForm } from 'util/hooks';
import { SIGNUP } from 'graphql/schemas/account';


function SignupPage(props) {
    const context = useContext(AuthContext);
    const { onChange, onSubmit, values } = useForm(signupUser, {
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [signup] = useMutation(SIGNUP, {
        update(_, { data: { signup: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        variables: {
            input: values
        }
    });

    function signupUser() {
        signup();
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="signup-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    name='email'
                    placeholder='Введите ваш email...'
                    onChange={onChange}
                />
            </Form.Group>

            <Form.Group controlId="signup-password">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    placeholder='Введите пароль...'
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group controlId="signup-confirm-password">
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control
                    type='password'
                    name='confirmPassword'
                    placeholder='Повторите пароль...'
                    onChange={onChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Зарегистрироваться
            </Button>
        </Form>
    );
}

export default SignupPage;

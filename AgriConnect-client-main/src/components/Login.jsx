import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Login({ props: { loginInfo, setLoginInfo } }) {

    const [form, setForm] = useState({
        username: '',
        passsword: '',
    });
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const [loginUser] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            setLoginInfo({ 
                loggedIn: true,
                username: result.data.login.username,
                token: result.data.login.token
            });
			navigate('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors);
            console.log(errors)
        },
        variables: form
    });

    return (
        <div className='login'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" 
                    onChange={(e)=>setForm({...form, username: e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" 
                    onChange={(e)=>setForm({...form, password: e.target.value})} />
                </Form.Group>

                <Button variant="primary" type="submit" 
                    onClick={(e) => { 
                        e.preventDefault();
                        loginUser();
                    } } >
                    Submit
                </Button>
            </Form>
            <br />
            <a className="a-tag" onClick={ ()=>navigate('register') }>don't have a account</a>
            {/* {
                errors.length != 0 && 
                <Alert variant={'danger'}>
                    <ul>
                    {
                        errors.map((e) => (
                            <li>
                                {e.message}
                            </li>
                        ))
                    }
                    </ul>
                </Alert>
            } */}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation($username: String!, $password: String!) {
        login: login(username: $username, password: $password) {
            id
            username
            token
        }
    }
`;

export default Login;

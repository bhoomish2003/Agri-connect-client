import { useMutation, gql } from '@apollo/client';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


function Register({ props: { loginInfo, setLoginInfo } }) {

    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const [registerUser] = useMutation(REGISTER_MUTATION, {
        update(proxy, result) {
            console.log(result);
            setLoginInfo({ 
                isLoggedIn: true, 
                username: result.data.register.username,
                token: result.data.register.token 
            });
            navigate('/');
        },
        onError(err) {
            setErrors(err);
        },
        variables: { input: form } ,
    });

    return (
        <div className='register'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" 
                    onChange={(e)=>setForm({...form, username: e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="e" placeholder="Enter email" 
                    onChange={(e)=>setForm({...form, email: e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" 
                    onChange={(e)=>setForm({...form, password: e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="confirm Password"
                    onChange={(e)=>setForm({...form, confirmPassword: e.target.value})} />
                </Form.Group>

                <Button variant="primary" type="submit" 
                    onClick={(e) => { 
                        e.preventDefault();
                        registerUser();
                    }} >
                    Submit
                </Button>
            </Form>
            <br/>
            <a onClick={ ()=>navigate('register') }>already have an account</a>
            {
                errors.length != 0 && 
                <Alert variant={'danger'}>
                    {errors}
                </Alert>
            }
        </div>
    );
}


const REGISTER_MUTATION = gql`
    mutation($input: registerUserInput!) {
        register: register(input: $input) {
            id
            username
            email
            token
        }
    }

`;

export default Register;

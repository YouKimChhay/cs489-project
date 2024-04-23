import {useDispatch} from "react-redux";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {login} from "../../actions/authActions";


const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({});
    const [error, setError] = useState('');

    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await dispatch(login(credentials));
            navigate('/');
        } catch (error) {
            console.error(error);
            setError("Login failed! Check credentials and try again or register an account.");
        }
    }

    return (
        <div style={{padding: 30}}>
            <h1>Login</h1>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="email"
                        name='email'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="password"
                        name='password'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Button style={{marginRight: 10}} type='submit'>Login</Button>
            </Form>
        </div>
    );
}

export default LoginForm;
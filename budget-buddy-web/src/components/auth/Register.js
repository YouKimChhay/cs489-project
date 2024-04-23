import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {register} from "../../actions/authActions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(register(user));
            navigate('/');
        } catch (error) {
            setError("Register failed! Try different username or email.");
        }
    }

    return (
        <div style={{padding: 30}}>
            <h1>Register</h1>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="username"
                        name='username'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="email"
                        name='email'
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
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
                <Button style={{marginRight: 10}} type='submit'>Register</Button>
            </Form>
        </div>
    );
}

export default Register;
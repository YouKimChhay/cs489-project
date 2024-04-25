import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import {useState} from "react";
import CategoryService from "../../services/CategoryService";


export default function AddCategory() {

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth);

    const [newCategory, setNewCategory] = useState({});
    const [error, setError] = useState("");

    const handleChange = event => {
        setNewCategory({
            ...newCategory,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        CategoryService.addNewCategory(user.userId, user.accessToken, newCategory)
            .then(() => navigate(-1))
            .catch(() => setError("Unable to add a new category! Please try again."));
    }

    const addCategoryFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>New Category</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Category name"
                        name='name'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Category description"
                        name='description'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                        required
                        type="Number"
                        step="0.01"
                        placeholder="Budget amount for this category"
                        name='budget'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Button style={{marginRight: 10}} type='submit'>Add Category</Button>
            </Form>
        </div>
    );

    return user.accessToken ? addCategoryFormDiv : <Main/>;
}
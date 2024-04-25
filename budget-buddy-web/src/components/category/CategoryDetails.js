import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import CategoryService from "../../services/CategoryService";
import ConfirmModal from "../modal/ConfirmModal";

export default function CategoryDetails() {

    const navigate = useNavigate();
    const {categoryId} = useParams();

    const user = useSelector((state) => state.auth);

    const [category, setCategory] = useState({});

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        CategoryService.getCategoryById(user.userId, user.accessToken, categoryId)
            .then(response => setCategory(response.data.data))
            .catch(() => navigate('/addCategory'));
    }, []);

    const handleChange = (event) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value
        });
    };

    const updateCategory = (event) => {
        event.preventDefault();

        CategoryService.updateCategoryById(user.userId, user.accessToken, categoryId, category)
            .then(() => navigate('/categories'))
            .catch(() => setError("Unable to update the category. Please try again later."));
    };

    const deleteCategory = async () => {
        CategoryService.deleteCategoryById(user.userId, user.accessToken, categoryId)
            .then((response) => {
                console.log(response.data);
                if (response.data.statusCode === 500) {
                    setError("Unable to delete the category.")
                    setDeleteModalShow(false);
                } else
                    navigate('/categories')
            })
            .catch(() => setError("Unable to delete the category. Please try again later."));
    };

    const updateCategoryFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>Category Details</h1>
            {category && (
                <Form onSubmit={updateCategory}>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Category name"
                            name='name'
                            value={category.name}
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
                            value={category.description}
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
                            value={category.budget}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Button variant={"secondary"} style={{marginRight: 10}}
                            onClick={() => navigate('/categories')}>Cancel</Button>
                    <Button style={{marginRight: 10}} type='submit'>Update</Button>
                    <Button variant="danger" onClick={() => setDeleteModalShow(true)}>Delete</Button>
                </Form>
            )}
            <ConfirmModal show={deleteModalShow}
                          onHide={() => setDeleteModalShow(false)}
                          question={`Confirm Delete?`}
                          actionColor={'danger'}
                          action={'Delete'}
                          onAction={deleteCategory}
            />
        </div>
    );

    return user.accessToken ? updateCategoryFormDiv : <Main/>
}
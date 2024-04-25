import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CategoryService from "../../services/CategoryService";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Main from "../home/Main";
import BillService from "../../services/BillService";

export default function AddBill() {

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth);

    const [newBill, setNewBill] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        CategoryService.getAllCategories(user.userId, user.accessToken)
            .then(response => {
                setCategories(response.data.data);
                setSelectedCategory(response.data.data[0].name);
            })
            .catch(() => setError("Unable to load category data! Please add a new category."))
    }, []);

    const handleChange = event => {
        setNewBill({
            ...newBill,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();

        newBill.category = {
            name: selectedCategory
        }

        BillService.addNewBill(user.userId, user.accessToken, newBill)
            .then(() => navigate('/bills'))
            .catch(() => setError("Unable to add a new bill. Please try again later."));
    }

    const addBillFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>New Bill</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Choose a category below or create a new one</Form.Label>
                    <div>
                        <Button variant={"secondary"} href={'/addCategory'} style={{marginBottom: 15}}>Add
                            Category</Button>
                    </div>
                    <Form.Select name="category" onChange={(event) => setSelectedCategory(event.target.value)}>
                        {
                            categories && categories.map(category => <option key={category.categoryId}
                                                                             value={category.name}>{category.name}</option>)
                        }
                    </Form.Select>
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Bill name"
                        name='name'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        required
                        type="Number"
                        step="0.01"
                        placeholder="Amount for this bill"
                        name='amount'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Button style={{marginRight: 10}} type='submit'>Add Bill</Button>
            </Form>
        </div>
    );

    return user.accessToken ? addBillFormDiv : <Main/>;
}
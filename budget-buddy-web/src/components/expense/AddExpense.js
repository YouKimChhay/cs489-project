import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import CategoryService from "../../services/CategoryService";
import ExpenseService from "../../services/ExpenseService";


export default function AddExpense() {

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth);

    const [newExpense, setNewExpense] = useState({});
    const [paymentDate, setPaymentDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        CategoryService.getAllCategories(user.userId, user.accessToken)
            .then(response => {
                setCategories(response.data.data)
                setSelectedCategory(response.data.data[0].name);
            })
            .catch(() => setError("Unable to load category data! Please add a new category."));
    }, []);

    const handleChange = event => {
        setNewExpense({
            ...newExpense,
            [event.target.name]: event.target.value
        })
    }

    const handleDateChange = value => {
        const month = value.$M < 9 ? `0${value.$M + 1}` : value.$M + 1;
        const day = value.$D < 10 ? `0${value.$D}` : value.$D;
        setPaymentDate(`${value.$y}-${month}-${day}`);
    }

    const handleSubmit = event => {
        event.preventDefault();

        newExpense.paymentDate = paymentDate;
        newExpense.category = {
            name: selectedCategory
        }

        ExpenseService.addNewExpense(user.userId, user.accessToken, newExpense)
            .then(() => navigate('/expenses'))
            .catch(() => setError("Unable to add the new expense! Please try again."));
    }

    const addExpenseFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>New Expense</h1>
            <Form.Group as={Col} md="4">
                <Form.Label>Choose a category below or create a new one</Form.Label>
                <div>
                    <Button variant={"secondary"} href={'/addCategory'} style={{marginBottom: 15}}>Add Category</Button>
                </div>
                <Form.Select name="category" onChange={(event) => setSelectedCategory(event.target.value)}>
                    {
                        categories && categories.map(category => <option key={category.categoryId}
                                                                         value={category.name}>{category.name}</option>)
                    }
                </Form.Select>
            </Form.Group>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Expense name"
                        name='name'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Description of the expense"
                        name='description'
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
                        placeholder="Expense amount"
                        name='amount'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Payment Date</Form.Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker name="paymentDate" onChange={handleDateChange}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </Form.Group>
                <br/>
                <Button style={{marginRight: 10}} type='submit'>Add Expense</Button>
            </Form>
        </div>
    );

    return user.accessToken ? addExpenseFormDiv : <Main/>;
}
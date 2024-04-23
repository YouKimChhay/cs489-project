import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import CategoryService from "../../services/CategoryService";
import ExpenseService from "../../services/ExpenseService";


export default function ExpenseDetails() {

    const navigate = useNavigate();
    const {expenseId} = useParams();

    const user = useSelector((state) => state.auth);

    const [expense, setExpense] = useState({});
    const [paymentDate, setPaymentDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        ExpenseService.getExpenseById(user.userId, user.accessToken, expenseId)
            .then(response => {
                const currentExpense = response.data.data;
                setExpense(currentExpense);
                setPaymentDate(currentExpense.paymentDate);
                setSelectedCategory(currentExpense.categoryName);
            })
            .catch(error => navigate('/addExpense'));
        CategoryService.getAllCategories(user.userId, user.accessToken)
            .then(response => {
                setCategories([selectedCategory, ...response.data.data]);
            })
            .catch(error => setError("Unable to load category data! Please add a new category."));
    }, []);

    const handleChange = event => {
        setExpense({
            ...expense,
            [event.target.name]: event.target.value
        })
    }

    const handleDateChange = value => {
        const month = value.$M < 9 ? `0${value.$M + 1}` : value.$M + 1;
        const day = value.$D < 10 ? `0${value.$D}` : value.$D;
        setPaymentDate(`${value.$y}-${month}-${day}`);
    }

    const updateExpense = event => {
        event.preventDefault();

        expense.paymentDate = paymentDate;
        expense.category = {
            name: selectedCategory
        }

        ExpenseService.updateExpenseById(user.userId, user.accessToken, expenseId, expense)
            .then(response => navigate('/expenses'))
            .catch(error => setError("Unable to update the expense. Please try again later."));
    }

    const deleteExpense = event => {
        event.preventDefault();
        ExpenseService.deleteExpenseById(user.userId, user.accessToken, expenseId)
            .then(response => navigate('/expenses'))
            .catch(error => setError("Unable to delete the expense. Please try again later."));
    }

    const addExpenseFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>Expense Details</h1>
            <Form.Group as={Col} md="4">
                <Form.Label>Choose a category below or create a new one</Form.Label>
                <p>Current Category is <span
                    style={{color: 'forestgreen', textDecoration: 'underline'}}>{selectedCategory}</span>.</p>
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
            <Form onSubmit={updateExpense}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Expense name"
                        name='name'
                        value={expense.name}
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
                        value={expense.description != null ? expense.description : ''}
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
                        value={expense.amount}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Payment Date</Form.Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker name="paymentDate" label={expense.paymentDate} onChange={handleDateChange}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </Form.Group>
                <br/>
                <Button variant={"secondary"} style={{marginRight: 10}}
                        onClick={() => navigate('/expenses')}>Cancel</Button>
                <Button style={{marginRight: 10}} type='submit'>Update</Button>
                <Button variant="danger" onClick={deleteExpense}>Delete</Button>
            </Form>
        </div>
    );

    return user.accessToken ? addExpenseFormDiv : <Main/>;
}
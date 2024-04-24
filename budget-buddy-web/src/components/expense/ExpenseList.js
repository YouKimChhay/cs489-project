import {Button, ListGroup, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Expense from "./Expense";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import ExpenseService from "../../services/ExpenseService";
import CategoryService from "../../services/CategoryService";


export default function ExpenseList() {

    const user = useSelector((state) => state.auth);

    const [activeCategory, setActiveCategory] = useState("");
    const [categories, setCategories] = useState(["Rent", "Grocery"]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories(user.userId, user.accessToken)
            .then(response => {
                setCategories(response.data.data.map(each => each.name));
                setActiveCategory(response.data.data[0].name);
            })
            .catch(error => console.error(error));
    }, [])

    useEffect(() => {
        ExpenseService.getAllExpensesByCategory(user.userId, user.accessToken, activeCategory)
            .then(response => setExpenses(response.data.data))
            .catch(error => console.error(error));
    }, [activeCategory])

    const handleCategoryChange = event => {
        setActiveCategory(event.target.innerText);
    }

    const expenseListDiv = (
        <div style={{padding: 30}}>
            <Button href={'/addExpense'}>New Expense</Button>
            <hr/>
            <div>
                <ListGroup horizontal='md'>
                    {
                        categories && categories.map(category => (
                            category === activeCategory ?
                                <ListGroup.Item active key={category}
                                                onClick={handleCategoryChange}>{category}</ListGroup.Item> :
                                <ListGroup.Item key={category} onClick={handleCategoryChange}>{category}</ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <Button variant={"secondary"} style={{marginTop: 15}} href={'/addCategory'}>New Category</Button>
            </div>
            <hr/>
            <h2>Expenses</h2>
            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    expenses && expenses.map(expense => <Expense key={expense.expenseId} {...expense} />)
                }
                </tbody>
            </Table>
        </div>
    );

    return user.accessToken ? expenseListDiv : <Main/>;
}
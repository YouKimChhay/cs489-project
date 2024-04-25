import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CategoryService from "../../services/CategoryService";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Main from "../home/Main";
import BillService from "../../services/BillService";
import ConfirmModal from "../modal/ConfirmModal";

export default function BillDetails() {

    const navigate = useNavigate();
    const {billId} = useParams();

    const user = useSelector((state) => state.auth);

    const [bill, setBill] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [payModalShow, setPayModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        BillService.getBillById(user.userId, user.accessToken, billId)
            .then(response => {
                const billData = response.data.data;
                setBill(billData);
                setSelectedCategory(billData.categoryName);
            })
            .catch(() => navigate('/addBill'));
        CategoryService.getAllCategories(user.userId, user.accessToken)
            .then(response => {
                setCategories([selectedCategory, ...response.data.data]);
            })
            .catch(() => setError("Unable to load category data! Please add a new category."));
    }, []);

    const handleChange = event => {
        setBill({
            ...bill,
            [event.target.name]: event.target.value
        })
    }

    const updateBill = event => {
        event.preventDefault();

        bill.category = {
            name: selectedCategory
        }

        BillService.updateBillById(user.userId, user.accessToken, billId, bill)
            .then(() => navigate('/bills'))
            .catch(() => setError("Unable to update the bill. Please try again later."));
    }

    const deleteBill = event => {
        event.preventDefault();
        BillService.deleteBillById(user.userId, user.accessToken, billId)
            .then(() => navigate('/bills'))
            .catch(() => setError("Unable to delete the bill. Please try again later."));
    }

    const payBill = async event => {
        event.preventDefault();
        BillService.payBill(user.userId, user.accessToken, billId)
            .then(() => navigate('/expenses'))
            .catch(error => console.log(error));
    }


    const updateBillFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>
                Bill Details
                <Button style={{marginLeft: '1em'}} variant={'warning'}
                        onClick={() => setPayModalShow(true)}>Pay Bill</Button>
            </h1>
            <Form onSubmit={updateBill}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Choose a category below or create a new one</Form.Label>
                    <p>Current Category is <span
                        style={{color: 'forestgreen', textDecoration: 'underline'}}>{selectedCategory}</span>.</p>
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
                        value={bill.name}
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
                        value={bill.amount}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Button variant={'secondary'} onClick={() => navigate('/bills')}
                        style={{marginRight: 10}}>Cancel</Button>
                <Button style={{marginRight: 10}} type='submit'>Update</Button>
                <Button variant={'danger'} onClick={() => setDeleteModalShow(true)}>Delete</Button>
            </Form>
            <ConfirmModal show={deleteModalShow}
                          onHide={() => setDeleteModalShow(false)}
                          question={`Confirm Delete?`}
                          actionColor={'danger'}
                          action={'Delete'}
                          onAction={deleteBill}
            />
            <ConfirmModal show={payModalShow}
                          onHide={() => setPayModalShow(false)}
                          question={`Confirm Pay?`}
                          actionColor={'warning'}
                          action={'Paid'}
                          onAction={payBill}
            />
        </div>
    );

    return user.accessToken ? updateBillFormDiv : <Main/>;
}
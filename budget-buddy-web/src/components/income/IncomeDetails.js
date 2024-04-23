import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import IncomeService from "../../services/IncomeService";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";

export default function IncomeDetails() {

    const navigate = useNavigate();
    const {incomeId} = useParams();

    const user = useSelector((state) => state.auth);

    const [income, setIncome] = useState({});
    const [payDate, setPayDate] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        IncomeService.getIncomeById(user.userId, user.accessToken, incomeId)
            .then(response => setIncome(response.data.data))
            .catch(error => navigate('/addIncome'))
    }, []);

    const handleChange = (event) => {
        setIncome({
            ...income,
            [event.target.name]: event.target.value
        });
    };

    const handleDateChange = value => {
        const month = value.$M < 9 ? `0${value.$M + 1}` : value.$M + 1;
        const day = value.$D < 10 ? `0${value.$D}` : value.$D;
        setPayDate(`${value.$y}-${month}-${day}`);
    }

    const updateIncome = (event) => {
        event.preventDefault();

        income.payDate = payDate;

        IncomeService.updateIncomeById(user.userId, user.accessToken, incomeId, income)
            .then(response => navigate('/incomes'))
            .catch(error => setError("Unable to update the income. Please try again later."));
    };

    const deleteIncome = async () => {
        IncomeService.deleteIncomeById(user.userId, user.accessToken, incomeId)
            .then(response => navigate('/incomes'))
            .catch(error => setError("Unable to delete the income. Please try again later."));
    };

    const updateIncomeFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>Income Details</h1>
            {income && (
                <Form onSubmit={updateIncome}>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Source</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Income source"
                            name='source'
                            value={income.source}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            required
                            type="Number"
                            placeholder="Income amount"
                            name='amount'
                            value={income.amount}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Pay Date</Form.Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker name="payDate" label={income.payDate} onChange={handleDateChange}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Form.Group>
                    <br/>
                    <Button variant={"secondary"} style={{marginRight: 10}}
                            onClick={() => navigate('/incomes')}>Cancel</Button>
                    <Button style={{marginRight: 10}} type='submit'>Update</Button>
                    <Button variant="danger" onClick={deleteIncome}>Delete</Button>
                </Form>
            )}
        </div>
    );

    return user.accessToken ? updateIncomeFormDiv : <Main/>
}
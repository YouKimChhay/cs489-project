import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import IncomeService from "../../services/IncomeService";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import {useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";


export default function AddIncome() {

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth);

    const [newIncome, setNewIncome] = useState({});
    const [payDate, setPayDate] = useState("");

    const [error, setError] = useState("");

    const handleChange = event => {
        setNewIncome({
            ...newIncome,
            [event.target.name]: event.target.value
        })
    }

    const handleDateChange = value => {
        const month = value.$M < 9 ? `0${value.$M + 1}` : value.$M + 1;
        const day = value.$D < 10 ? `0${value.$D}` : value.$D;
        setPayDate(`${value.$y}-${month}-${day}`);
    }

    const addIncome = event => {
        event.preventDefault();

        newIncome.payDate = payDate;

        IncomeService.addNewIncome(user.userId, user.accessToken, newIncome)
            .then(() => navigate('/incomes'))
            .catch(() => setError("Unable to add a new income! Please try again."));
    }

    const addIncomeFormDiv = (
        <div style={{padding: 30}}>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            <h1>New Income</h1>
            <Form onSubmit={addIncome}>
                <Form.Group as={Col} md="4">
                    <Form.Label>Source</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Income source"
                        name='source'
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
                        placeholder="Income amount"
                        name='amount'
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <Form.Group as={Col} md="4">
                    <Form.Label>Pay Date</Form.Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker name="payDate" onChange={handleDateChange}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </Form.Group>
                <br/>
                <Button style={{marginRight: 10}} type='submit'>Add Income</Button>
            </Form>
        </div>
    );

    return user.accessToken ? addIncomeFormDiv : <Main/>;
}
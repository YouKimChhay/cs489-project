import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Income from "./Income";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import IncomeService from "../../services/IncomeService";


export default function IncomeList() {

    const user = useSelector((state) => state.auth);
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        IncomeService.getAllIncomes(user.userId, user.accessToken)
            .then(response => setIncomes(response.data.data))
            .catch(error => console.error(error));
    }, [])

    const incomesDiv = (
        <div style={{padding: 30}}>
            <Button href={'/addIncome'}>New Income</Button>
            <hr/>
            <h2>Incomes</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Source</th>
                    <th>Amount</th>
                    <th>Paid Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    incomes && incomes.map(income => <Income key={income.incomeId} {...income} />)
                }
                </tbody>
            </Table>
        </div>
    );

    return user.accessToken ? incomesDiv : <Main/>;
}
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SummaryService from "../../services/SummaryService";
import Summary from "../summary/Summary";
import {Col, Form, Row} from "react-bootstrap";
import monthList from "../summary/Month";
import dayjs from "dayjs";

export default function LoginHome() {

    const now = dayjs();
    const currentYear = now.year();

    const user = useSelector((state) => state.auth);

    const [summary, setSummary] = useState({});
    const [incomeBudgetData, setIncomeBudgetData] = useState([]);
    const [expenseCategoryData, setExpenseCategoryData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [month, setMonth] = useState(now.month());

    const [error, setError] = useState("");


    useEffect(() => {
        SummaryService.getSummary(user.userId, user.accessToken, selectedYear, month)
            .then(response => {
                const summaryData = response.data.data;
                if (summaryData == null || (summaryData.totalIncome === 0 && summaryData.totalExpense === 0))
                    setError("Not enough data to build a dashboard!")
                else {
                    setSummary(summaryData);
                    setIncomeBudgetData(SummaryService.getIncomeBudgetData(summaryData))
                    setExpenseCategoryData(SummaryService.getTotalExpensePerCategoryData(summaryData))
                    setError("");
                }
            })
            .catch(() => setError("Not enough data to build a dashboard!"))
    }, [month, selectedYear]);


    return (
        <div style={{padding: 30}}>
            <h1>Welcome, {user.username}!</h1>
            <p>Manage your money like a pro with Budget Buddy!</p>
            <hr/>
            <Form>
                <Row>
                    <Col xs="auto">
                        <Form.Select name="month" onChange={event => setMonth(parseInt(event.target.value) + 1)}>
                            {
                                monthList && monthList.map((monthName, index) => index === month - 1 ?
                                    <option selected key={index} value={index}>{monthName}</option> :
                                    <option key={index} value={index}>{monthName}</option>)
                            }
                        </Form.Select>
                    </Col>
                    <Col xs="auto">
                        <Form.Select name="year" onChange={event => setSelectedYear(parseInt(event.target.value))}>
                            <option key={currentYear} value={currentYear}>{currentYear}</option>
                            <option key={currentYear - 1} value={currentYear - 1}>{currentYear - 1}</option>
                            <option key={currentYear - 2} value={currentYear - 2}>{currentYear - 2}</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form>
            <br/>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
            {
                !error && <Summary summary={summary} incomeBudgetData={incomeBudgetData}
                                   expenseCategoryData={expenseCategoryData}/>
            }
        </div>
    );
}
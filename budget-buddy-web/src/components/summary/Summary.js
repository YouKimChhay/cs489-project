import {Card, Table} from "react-bootstrap";
import DisplayPieChart from "./DisplayPieChart";
import Utils from "../../utils/Utils";
import ExpenseBudgetTable from "./ExpenseBudgetTable";

export default function Summary({summary, incomeBudgetData, expenseCategoryData}) {

    return (
        <div>
            <h4>Your budget at a glance!</h4>
            <div className="mt-3 d-flex flex-wrap justify-content-between">
                <Card bg={"primary"} text={'white'} style={{width: '12rem'}} className="mb-2">
                    <Card.Header>Total Income</Card.Header>
                    <Card.Body>
                        <Card.Title>{Utils.format_money(summary.totalIncome)}</Card.Title>
                    </Card.Body>
                </Card>
                <Card bg={"danger"} text={'white'} style={{width: '12rem'}} className="mb-2">
                    <Card.Header>Total Expense</Card.Header>
                    <Card.Body>
                        <Card.Title>{Utils.format_money(summary.totalExpense)}</Card.Title>
                    </Card.Body>
                </Card>
                <Card bg={"success"} text={'white'} style={{width: '12rem'}} className="mb-2">
                    <Card.Header>Total Save</Card.Header>
                    <Card.Body>
                        <Card.Title>{Utils.format_money(summary.totalIncome - summary.totalExpense)}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
            <hr/>
            <h4>Where is your money allocated across different categories?</h4>
            <div className={"mt-3 d-flex flex-wrap justify-content-around"}>
                {
                    incomeBudgetData && <DisplayPieChart title={"Income Vs. Budget"} data={incomeBudgetData}/>
                }
                <DisplayPieChart title={"Expense Per Category"} data={expenseCategoryData}/>
            </div>
            <hr/>
            <h4>How does your spending compare to your budget?</h4>
            <Table responsive bordered className={"mt-3"}>
                <thead>
                <tr className={"table-dark"}>
                    <th>Category</th>
                    <th>Budget</th>
                    <th>Total Expense</th>
                    <th>Difference</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>
                {
                    summary.totalExpensePerCategoryList &&
                    summary.totalExpensePerCategoryList.map(each => <ExpenseBudgetTable key={each.categoryName}
                                                                                        totalExpensePerCategory={each}/>)
                }
                </tbody>
            </Table>
            <hr/>
            <footer className={"text-center"}>
                <p>&copy; 2024 Budget Buddy</p>
            </footer>
        </div>
    );
}
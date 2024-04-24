import Utils from "../../utils/Utils";


export default function ExpenseBudgetTable({totalExpensePerCategory}) {

    const diff = totalExpensePerCategory.budget - totalExpensePerCategory.totalExpense

    return (
        <tr className={diff < 0 ? "table-danger" : "table-success"}>
            <td>{totalExpensePerCategory.categoryName}</td>
            <td>{Utils.format_money(totalExpensePerCategory.budget)}</td>
            <td>{Utils.format_money(totalExpensePerCategory.totalExpense)}</td>
            <td>{Utils.format_money(diff)}</td>
            <td>{diff >= 0 ? "Budgeted" : "Overspending"}</td>
        </tr>
    );
}
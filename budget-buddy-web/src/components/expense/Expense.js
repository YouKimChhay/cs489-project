import {useNavigate} from "react-router-dom";
import Utils from "../../utils/Utils";

export default function Expense({expenseId, name, description, amount, paymentDate}) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/expenses/${expenseId}`)}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{Utils.format_money(amount)}</td>
            <td>{paymentDate}</td>
        </tr>
    );
}
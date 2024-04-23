import {useNavigate} from "react-router-dom";

export default function Expense({expenseId, name, description, amount, paymentDate}) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/expenses/${expenseId}`)}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{amount}</td>
            <td>{paymentDate}</td>
        </tr>
    );
}
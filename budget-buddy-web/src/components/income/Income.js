import {useNavigate} from "react-router-dom";

export default function Income({incomeId, source, amount, payDate}) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate('/incomes/' + incomeId)}>
            <td>{source}</td>
            <td>{amount}</td>
            <td>{payDate}</td>
        </tr>
    );
}
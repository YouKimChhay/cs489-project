import {useNavigate} from "react-router-dom";
import Utils from "../../utils/Utils";

export default function Income({incomeId, source, amount, payDate}) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate('/incomes/' + incomeId)}>
            <td>{source}</td>
            <td>{Utils.format_money(amount)}</td>
            <td>{payDate}</td>
        </tr>
    );
}
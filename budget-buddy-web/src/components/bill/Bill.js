import Utils from "../../utils/Utils";
import {useNavigate} from "react-router-dom";

export default function Bill({billId, categoryName, name, amount, updatedAt}) {

    const navigate = useNavigate();

    return (
        <>
            <tr onClick={() => navigate(`/bills/${billId}`)}>
                <td>{categoryName}</td>
                <td>{name}</td>
                <td>{Utils.format_money(amount)}</td>
                <td>{updatedAt.split('T')[0]}</td>
            </tr>
        </>
    );
}
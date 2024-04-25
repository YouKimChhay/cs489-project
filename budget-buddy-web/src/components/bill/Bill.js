import Utils from "../../utils/Utils";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import BillService from "../../services/BillService";
import {useSelector} from "react-redux";

export default function Bill({billId, categoryName, name, amount, updatedAt}) {

    const navigate = useNavigate();

    const user = useSelector(state => state.auth);

    const handlePaid = async event => {
        event.preventDefault();
        BillService.payBill(user.userId, user.accessToken, billId)
            .then(() => navigate('/expenses'))
            .catch(error => console.log(error));
    }

    return (
        <tr onClick={() => navigate(`/bills/${billId}`)}>
            <td>{categoryName}</td>
            <td>{name}</td>
            <td>{Utils.format_money(amount)}</td>
            <td>{updatedAt.split('T')[0]}</td>
            <td>
                <Button variant={'warning'} onClick={handlePaid}>Paid</Button>
            </td>
        </tr>
    );
}
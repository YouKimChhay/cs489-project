import {useNavigate} from "react-router-dom";
import Utils from "../../utils/Utils";

export default function Category({categoryId, name, description, budget}) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/categories/${categoryId}`)}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{Utils.format_money(budget)}</td>
        </tr>
    );
}
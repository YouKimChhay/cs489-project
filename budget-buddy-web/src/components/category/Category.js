import {useNavigate} from "react-router-dom";

export default function Category({categoryId, name, description, budget}) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/categories/${categoryId}`)}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{budget}</td>
        </tr>
    );
}
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../actions/authActions";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(logout());
        navigate('/');
    });
}

export default Logout;
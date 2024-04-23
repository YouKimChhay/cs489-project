import {useSelector} from "react-redux";
import LoginHome from "./LoginHome";
import PublicHome from "./PublicHome";


const Main = () => {
    const isAuthenticated = useSelector((state) => state.auth.accessToken !== null);

    return isAuthenticated ? <LoginHome/> : <PublicHome/>;
};

export default Main;
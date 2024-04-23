import {useSelector} from "react-redux";

export default function LoginHome() {
    const username = useSelector((state) => state.auth.username);

    return (
        <div style={{padding: 30}}>
            <h1>Welcome, {username}!</h1>
            <p>Manage your money like a pro with Budget Buddy!</p>
            <p style={{color: 'red'}}>show summary/dashboard here</p>
        </div>
    );
}
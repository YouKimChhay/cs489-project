import {useSelector} from "react-redux";
import Main from "../home/Main";

export default function SavingGoalList() {

    const user = useSelector((state) => state.auth);

    const savingGoalListDiv = (
        <div style={{padding: 30}}>
            <h2>Coming soon!</h2>
        </div>
    );

    return user.accessToken ? savingGoalListDiv : <Main/>
}
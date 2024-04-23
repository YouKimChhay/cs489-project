import {BrowserRouter, Route, Routes} from "react-router-dom";
import IncomeList from "./components/income/IncomeList";
import ExpenseList from "./components/expense/ExpenseList";
import AddIncome from "./components/income/AddIncome";
import AddExpense from "./components/expense/AddExpense";
import {useSelector} from "react-redux";
import Main from "./components/home/Main";
import LoginForm from "./components/auth/LoginForm";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import LoginNav from "./components/nav/LoginNav";
import PublicNav from "./components/nav/PublicNav";
import IncomeDetails from "./components/income/IncomeDetails";
import AddCategory from "./components/category/AddCategory";
import ExpenseDetails from "./components/expense/ExpenseDetails";
import CategoryList from "./components/category/CategoryList";
import CategoryDetails from "./components/category/CategoryDetails";

function App() {

    const isAuthenticated = useSelector((state) => state.auth.accessToken !== null);

    return (
        <>
            {isAuthenticated ? <LoginNav/> : <PublicNav/>}
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<LoginForm/>}/>
                        <Route path='/logout' element={<Logout/>}/>

                        <Route path='/incomes' element={<IncomeList/>}/>
                        <Route path='/incomes/:incomeId' element={<IncomeDetails/>}/>
                        <Route path='/addIncome' element={<AddIncome/>}/>

                        <Route path='/categories' element={<CategoryList/>}/>
                        <Route path='/categories/:categoryId' element={<CategoryDetails/>}/>
                        <Route path='/addCategory' element={<AddCategory/>}/>

                        <Route path='/expenses' element={<ExpenseList/>}/>
                        <Route path='/expenses/:expenseId' element={<ExpenseDetails/>}/>
                        <Route path='/addExpense' element={<AddExpense/>}/>

                        <Route path='*' element={<Main/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;

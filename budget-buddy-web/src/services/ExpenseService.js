import http from '../config/axios'
import header from "../config/header";
import {EXPENSE_URL, EXPENSES_CATEGORY_URL, EXPENSES_URL} from "../contants/api";


const getAllExpenses = (userId, accessToken) => {
    return http.get(EXPENSES_URL(userId), {headers: header(accessToken)});
}

const getAllExpensesByCategory = (userId, accessToken, categoryName) => {
    return http.get(EXPENSES_CATEGORY_URL(userId, categoryName), {headers: header(accessToken)});
}

const addNewExpense = (userId, accessToken, newExpense) => {
    return http.post(EXPENSES_URL(userId), newExpense, {headers: header(accessToken)});
}

const getExpenseById = (userId, accessToken, expenseId) => {
    return http.get(EXPENSE_URL(userId, expenseId), {headers: header(accessToken)})
}

const updateExpenseById = (userId, accessToken, expenseId, updateExpense) => {
    return http.put(EXPENSE_URL(userId, expenseId), updateExpense, {headers: header(accessToken)})
}

const deleteExpenseById = (userId, accessToken, expenseId) => {
    return http.delete(EXPENSE_URL(userId, expenseId), {headers: header(accessToken)})
}

const ExpenseService = {
    getAllExpenses,
    getAllExpensesByCategory,
    addNewExpense,
    getExpenseById,
    updateExpenseById,
    deleteExpenseById
}

export default ExpenseService;
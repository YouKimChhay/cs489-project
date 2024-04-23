import http from '../config/axios'
import header from "../config/header";
import {INCOME_URL, INCOMES_URL} from "../contants/api";


const getAllIncomes = (userId, accessToken) => {
    return http.get(INCOMES_URL(userId), {headers: header(accessToken)});
}

const addNewIncome = (userId, accessToken, newIncome) => {
    return http.post(INCOMES_URL(userId), newIncome, {headers: header(accessToken)});
}

const getIncomeById = (userId, accessToken, incomeId) => {
    return http.get(INCOME_URL(userId, incomeId), {headers: header(accessToken)})
}

const updateIncomeById = (userId, accessToken, incomeId, updatedIncome) => {
    return http.put(INCOME_URL(userId, incomeId), updatedIncome, {headers: header(accessToken)})
}

const deleteIncomeById = (userId, accessToken, incomeId) => {
    return http.delete(INCOME_URL(userId, incomeId), {headers: header(accessToken)})
}

const IncomeService = {
    getAllIncomes,
    getIncomeById,
    addNewIncome,
    updateIncomeById,
    deleteIncomeById
}

export default IncomeService;
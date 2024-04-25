import {HOST} from "./constants";


const API_HEAD = '/api/v1/users';

export const REGISTER_URL = HOST + API_HEAD;
export const LOGIN_URL = HOST + API_HEAD + '/login';

export const INCOMES_URL = (userId) => {
    return API_HEAD + `/${userId}/incomes`;
}
export const INCOME_URL = (userId, incomeId) => {
    return API_HEAD + `/${userId}/incomes/${incomeId}`;
}

export const EXPENSES_URL = (userId) => {
    return API_HEAD + `/${userId}/expenses`;
}

export const EXPENSES_CATEGORY_URL = (userId, categoryName) => {
    return API_HEAD + `/${userId}/expenses?category=${categoryName}`;
}

export const EXPENSE_URL = (userId, expenseId) => {
    return API_HEAD + `/${userId}/expenses/${expenseId}`;
}

export const CATEGORIES_URL = (userId) => {
    return API_HEAD + `/${userId}/categories`;
}

export const CATEGORY_URL = (userId, categoryId) => {
    return API_HEAD + `/${userId}/categories/${categoryId}`;
}

export const SUMMARY_URL = (userId, year, month) => {
    return API_HEAD + `/${userId}/summary?year=${year}&month=${month}`;
}

export const BILLS_URL = (userId) => {
    return API_HEAD + `/${userId}/bills`;
}

export const BILL_URL = (userId, billId) => {
    return API_HEAD + `/${userId}/bills/${billId}`;
}

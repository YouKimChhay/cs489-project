import http from '../config/axios';
import {SUMMARY_URL} from "../contants/api";
import header from "../config/header";

const getSummary = (userId, accessToken, year, month) => {
    return http.get(SUMMARY_URL(userId, year, month), {headers: header(accessToken)});
}

const getIncomeBudgetData = (summaryData) => {
    let totalBudget = 0;
    const data = summaryData.totalExpensePerCategoryList.map(each => {
        totalBudget += each.budget;
        return {
            name: each.categoryName,
            value: each.budget
        }
    })

    const save = summaryData.totalIncome - totalBudget;

    if (save < 0)
        return null;

    data[data.length] = {
        name: "Save",
        value: save
    }
    return data;
}

const getTotalExpensePerCategoryData = (summaryData) => {
    return summaryData.totalExpensePerCategoryList.map(each => {
        return {
            name: each.categoryName,
            value: each.totalExpense
        }
    })
}

const SummaryService = {
    getSummary,
    getIncomeBudgetData,
    getTotalExpensePerCategoryData
}

export default SummaryService;
import http from "../config/axios";
import {BILL_URL, BILLS_URL} from "../contants/api";
import header from "../config/header";


const addNewBill = (userId, accessToken, bill) => {
    return http.post(BILLS_URL(userId), bill, {headers: header(accessToken)});
}

const getAllBills = (userId, accessToken) => {
    return http.get(BILLS_URL(userId), {headers: header(accessToken)});
}

const getBillById = (userId, accessToken, billId) => {
    return http.get(BILL_URL(userId, billId), {headers: header(accessToken)});
}

const updateBillById = (userId, accessToken, billId, updatedBill) => {
    return http.put(BILL_URL(userId, billId), updatedBill, {headers: header(accessToken)});
}

const deleteBillById = (userId, accessToken, billId) => {
    return http.delete(BILL_URL(userId, billId), {headers: header(accessToken)});
}

const payBill = (userId, accessToken, billId) => {
    return http.post(BILL_URL(userId, billId), {}, {headers: header(accessToken)});
}

const BillService = {
    addNewBill,
    getAllBills,
    getBillById,
    updateBillById,
    deleteBillById,
    payBill
}

export default BillService;
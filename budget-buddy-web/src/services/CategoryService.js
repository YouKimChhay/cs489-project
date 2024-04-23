import http from '../config/axios'
import header from "../config/header";
import {CATEGORIES_URL, CATEGORY_URL} from "../contants/api";


const getAllCategories = (userId, accessToken) => {
    return http.get(CATEGORIES_URL(userId), {headers: header(accessToken)});
}

const addNewCategory = (userId, accessToken, newCategory) => {
    return http.post(CATEGORIES_URL(userId), newCategory, {headers: header(accessToken)});
}

const getCategoryById = (userId, accessToken, categoryId) => {
    return http.get(CATEGORY_URL(userId, categoryId), {headers: header(accessToken)})
}

const updateCategoryById = (userId, accessToken, categoryId, updateCategory) => {
    return http.put(CATEGORY_URL(userId, categoryId), updateCategory, {headers: header(accessToken)})
}

const deleteCategoryById = (userId, accessToken, categoryId) => {
    return http.delete(CATEGORY_URL(userId, categoryId), {headers: header(accessToken)})
}

const CategoryService = {
    getAllCategories,
    getCategoryById,
    addNewCategory,
    updateCategoryById,
    deleteCategoryById
}

export default CategoryService;
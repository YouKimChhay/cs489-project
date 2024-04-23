import axios from "axios";
import {HOST} from "../contants/constants";

export default axios.create({
    baseURL: HOST
});
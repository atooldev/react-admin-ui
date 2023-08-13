import AppConfig from "../Config";
import axios from "axios";

const instance = axios.create({
    baseURL: AppConfig.API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});


export default instance

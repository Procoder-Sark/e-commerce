import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
});

export const ENDPOINTS = {
    USER: {
        LOGIN: '/user/login',
        LOGOUT: '/user/logout',
        SIGNUP: 'user/signup',
        RESET_PASSWORD: '/user/reset-password',
    },
    CART: {
        GET_CART: '/cart/get-cart',
        ADD_TO_CART: '/cart/add-to-cart',
        REMOVE: '/cart/remove-from-cart',
        INCREMENT: '/cart/increment',
        DECREMENT: '/cart/decrement',
        CLEAR_CART: '/cart/clear-cart',
    }
}
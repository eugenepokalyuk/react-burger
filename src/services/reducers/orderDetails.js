import {
    FETCH_ORDER_NUMBER_REQUEST,
    FETCH_ORDER_NUMBER_SUCCESS,
    FETCH_ORDER_NUMBER_FAILURE,
    UPDATE_ORDER_NUMBER
} from '../actions/orderDetails'

// Экшен для запроса номера заказа
const fetchOrderNumberRequest = () => ({
    type: FETCH_ORDER_NUMBER_REQUEST,
});

// Экшен для успешного получения номера заказа
const fetchOrderNumberSuccess = (orderNumber) => ({
    type: FETCH_ORDER_NUMBER_SUCCESS,
    payload: orderNumber,
});

// Экшен для ошибки при получении номера заказа
const fetchOrderNumberFailure = (error) => ({
    type: FETCH_ORDER_NUMBER_FAILURE,
    payload: error,
});

// Экшен для обновления номера заказа
const updateOrderNumber = (orderNumber) => ({
    type: UPDATE_ORDER_NUMBER,
    payload: orderNumber,
});

const initialState = {
    orderNumber: null,
    loading: false,
    error: null,
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_NUMBER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ORDER_NUMBER_SUCCESS:
            return {
                ...state,
                orderNumber: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_ORDER_NUMBER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_ORDER_NUMBER:
            return {
                ...state,
                orderNumber: action.payload,
            };
        default:
            return state;
    }
};
export const FETCH_ORDER_NUMBER_REQUEST = 'FETCH_ORDER_NUMBER_REQUEST';
export const FETCH_ORDER_NUMBER_SUCCESS = 'FETCH_ORDER_NUMBER_SUCCESS';
export const FETCH_ORDER_NUMBER_FAILURE = 'FETCH_ORDER_NUMBER_FAILURE';
export const UPDATE_ORDER_NUMBER = 'UPDATE_ORDER_NUMBER';

export const fetchOrderNumberRequest = () => ({
    type: FETCH_ORDER_NUMBER_REQUEST,
});

export const fetchOrderNumberSuccess = (orderNumber) => ({
    type: FETCH_ORDER_NUMBER_SUCCESS,
    payload: orderNumber,
});

export const fetchOrderNumberFailure = (error) => ({
    type: FETCH_ORDER_NUMBER_FAILURE,
    payload: error,
});

export const updateOrderNumber = (orderNumber) => ({
    type: UPDATE_ORDER_NUMBER,
    payload: orderNumber,
});
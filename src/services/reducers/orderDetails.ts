import {
    FETCH_ORDER_NUMBER_FAILURE,
    FETCH_ORDER_NUMBER_REQUEST,
    FETCH_ORDER_NUMBER_SUCCESS,
    UPDATE_ORDER_NUMBER
} from '../actions/orderDetails'
import {ActionTypes} from '../types/orderDetails/ActionTypes';
import {IOrderState} from '../types/types';

const initialState:IOrderState = {
    orderNumber: null,
    loading: false,
    error: null,
};

export const orderDetailsReducer = (state = initialState, action:ActionTypes) => {
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

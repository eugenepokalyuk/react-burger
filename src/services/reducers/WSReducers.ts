import {
    TWSActions,
    TWSAuthActions,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_AUTH_ORDERS,
    WS_GET_ORDERS
} from "../actions/WSActions";
import {TOrdersState} from "../types/types";

export const initialState:TOrdersState = {
    wsConnected: false,
    wsError: undefined,
    wsAuthConnected: false,
    wsAuthError: undefined,
    orders: [],
    userOrders: [],
    total: 0,
    totalToday: 0,
}

export const wsReducer = (state = initialState, action:TWSActions|TWSAuthActions):TOrdersState => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                wsConnected: false,
                wsError: undefined
            };

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                wsError: undefined
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsError: action.payload
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
            };

        case WS_GET_ORDERS:
            return {
                ...state,
                wsConnected: true,
                wsError: undefined,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };

        case WS_AUTH_CONNECTION_START:
            return {
                ...state,
                wsAuthConnected: false,
                wsAuthError: undefined
            };

        case WS_AUTH_CONNECTION_SUCCESS:
            return {
                ...state,
                wsAuthConnected: true,
                wsAuthError: undefined
            };

        case WS_AUTH_CONNECTION_ERROR:
            return {
                ...state,
                wsAuthConnected: false,
                wsAuthError: action.payload
            };

        case WS_AUTH_CONNECTION_CLOSED:
            return {
                ...state,
                wsAuthConnected: false,
                wsAuthError: undefined,
                userOrders: [],
                total: 0,
                totalToday: 0,
            };

        case WS_GET_AUTH_ORDERS:
            return {
                ...state,
                wsAuthConnected: true,
                wsAuthError: undefined,
                userOrders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };

        default:
            return state;
    }
}

import {
    FETCH_ORDER_NUMBER_FAILURE,
    FETCH_ORDER_NUMBER_REQUEST,
    FETCH_ORDER_NUMBER_SUCCESS,
    UPDATE_ORDER_NUMBER
} from "../../actions/orderDetails";


interface IOrderRequestAction {
    type:typeof FETCH_ORDER_NUMBER_REQUEST;
}

interface IOrderSuccessAction {
    type:typeof FETCH_ORDER_NUMBER_SUCCESS;
    payload:string|null
}

interface IOrderFailureAction {
    type:typeof FETCH_ORDER_NUMBER_FAILURE;
    payload:null|unknown
}

interface IOrderUpdateAction {
    type:typeof UPDATE_ORDER_NUMBER;
    payload:string|null
}

export type ActionTypes =
    |IOrderRequestAction
    |IOrderSuccessAction
    |IOrderFailureAction
    |IOrderUpdateAction;

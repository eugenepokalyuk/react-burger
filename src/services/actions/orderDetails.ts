export const FETCH_ORDER_NUMBER_REQUEST:'FETCH_ORDER_NUMBER_REQUEST' = 'FETCH_ORDER_NUMBER_REQUEST';

export const FETCH_ORDER_NUMBER_SUCCESS:'FETCH_ORDER_NUMBER_SUCCESS' = 'FETCH_ORDER_NUMBER_SUCCESS';

export const FETCH_ORDER_NUMBER_FAILURE:'FETCH_ORDER_NUMBER_FAILURE' = 'FETCH_ORDER_NUMBER_FAILURE';

export const UPDATE_ORDER_NUMBER:'UPDATE_ORDER_NUMBER' = 'UPDATE_ORDER_NUMBER';

export type TOrderDetails =
    |IFetchOrderNumberRequestAction
    |IFetchOrderNumberSuccessAction
    |IFetchOrderNumberFailureAction
    |IUpdateOrderNumberAction;

export interface IFetchOrderNumberRequestAction {
    readonly type:typeof FETCH_ORDER_NUMBER_REQUEST;
}

export interface IFetchOrderNumberSuccessAction {
    readonly type:typeof FETCH_ORDER_NUMBER_SUCCESS;
    readonly payload:string;
}

export interface IFetchOrderNumberFailureAction {
    readonly type:typeof FETCH_ORDER_NUMBER_FAILURE;
    readonly payload:string
}

export interface IUpdateOrderNumberAction {
    readonly type:typeof UPDATE_ORDER_NUMBER;
    readonly payload:string;
}

export const fetchOrderNumberRequest = ():IFetchOrderNumberRequestAction => ({
    type: FETCH_ORDER_NUMBER_REQUEST,
});

export const fetchOrderNumberSuccess = (orderNumber:string):IFetchOrderNumberSuccessAction => ({
    type: FETCH_ORDER_NUMBER_SUCCESS,
    payload: orderNumber,
});

export const fetchOrderNumberFailure = (error:string):IFetchOrderNumberFailureAction => ({
    type: FETCH_ORDER_NUMBER_FAILURE,
    payload: error,
});

export const updateOrderNumber = (orderNumber:string):IUpdateOrderNumberAction => ({
    type: UPDATE_ORDER_NUMBER,
    payload: orderNumber,
});

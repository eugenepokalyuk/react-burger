import { TWSOrder } from "../types";

export const ADD_VIEWED_ORDER: 'ADD_VIEWED_ORDER' = 'ADD_VIEWED_ORDER' as const;
export const CLEAR_VIEWED_ORDER: 'CLEAR_VIEWED_ORDER' = 'CLEAR_VIEWED_ORDER' as const;

export type TViewedOrder =
    | IAddViewedOrderAction
    | IClearViewedOrderAction;

// Генераторы экшенов

export interface IAddViewedOrderAction {
    readonly type: typeof ADD_VIEWED_ORDER;
    readonly payload: TWSOrder;
}

export interface IClearViewedOrderAction {
    readonly type: typeof CLEAR_VIEWED_ORDER;
}

export const addViewedOrder = (order: TWSOrder): IAddViewedOrderAction => ({
    type: ADD_VIEWED_ORDER,
    payload: order,
});

export const clearViewedOrder = (): IClearViewedOrderAction => ({
    type: CLEAR_VIEWED_ORDER,
});
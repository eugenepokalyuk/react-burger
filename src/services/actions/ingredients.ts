import { fetchIngredientsData } from '../../utils/api';
import { FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST } from './burgerConstructor'
import { Ingredient } from '../types/types';

export const FETCH_INGREDIENTS_REQUEST: 'FETCH_INGREDIENTS_REQUEST' = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS: 'FETCH_INGREDIENTS_SUCCESS' = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE: 'FETCH_INGREDIENTS_FAILURE' = 'FETCH_INGREDIENTS_FAILURE';

export type TIngredients =
    | IFetchIngredientsRequestAction
    | IFetchIngredientsSuccessAction
    | IFetchIngredientsFailureAction;

export interface IFetchIngredientsRequestAction {
    readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export interface IFetchIngredientsSuccessAction {
    readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
    readonly payload: Ingredient[];
}

export interface IFetchIngredientsFailureAction {
    readonly type: typeof FETCH_INGREDIENTS_FAILURE;
    readonly payload: string;
}

export const fetchIngredientsRequest = (): IFetchIngredientsRequestAction => ({
    type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (data: Ingredient[]): IFetchIngredientsSuccessAction => ({
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: data,
});

export const fetchIngredientsFailure = (error: string): IFetchIngredientsFailureAction => ({
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
});

export function getIngredients() {
    return function (dispatch: any) {
        dispatch({
            type: FETCH_INGREDIENTS_REQUEST,
        });

        fetchIngredientsData()
            .then((res) => {
                dispatch(fetchIngredientsSuccess(res.data)); // Добавлено передача данных в экшен
                dispatch({
                    type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
                });
            })
            .catch((e) =>
                dispatch({
                    type: FETCH_INGREDIENTS_FAILURE,
                })
            );
    };
}
import { fetchIngredientsData } from '../../utils/api';
import { FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST } from './burgerConstructor'
import { Ingredient } from '../types';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST' as const;
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS' as const;
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE' as const;

export const fetchIngredientsRequest = () => ({
    type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (data: Ingredient[]) => ({
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: data,
});

export const fetchIngredientsFailure = (error: any) => ({
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
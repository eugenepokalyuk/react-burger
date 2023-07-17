import { fetchIngredientsData } from '../../utils/api';
import { FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST } from '../../services/actions/burgerConstructor'

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredientsRequest = () => ({
    type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (data) => ({
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: data,
});

export const fetchIngredientsFailure = (error) => ({
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
});

export function getIngredients() {
    return function (dispatch) {
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
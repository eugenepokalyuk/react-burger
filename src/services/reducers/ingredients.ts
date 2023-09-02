import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE
} from '../actions/ingredients'
import { ActionTypes } from '../types/ingredients/ActionTypes';

import { IIngredientsState } from '../types/types';

const initialState: IIngredientsState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const selectLoading = (state: any) => state.loading;
export const selectError = (state: any) => state.error;

export const ingredientsReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_INGREDIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
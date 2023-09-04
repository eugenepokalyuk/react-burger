import {
    ADD_VIEWED_INGREDIENT,
    CLEAR_VIEWED_INGREDIENT
} from '../actions/currentIngredient'
import { ActionTypes } from '../types/ingredientDetails/ActionTypes';
import { IViewedIngredientState } from '../types/types';

const initialState: IViewedIngredientState = {
    viewedIngredient: null,
};

export const ingredientDetailsReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ADD_VIEWED_INGREDIENT:
            return {
                ...state,
                viewedIngredient: action.payload,
            };
        case CLEAR_VIEWED_INGREDIENT:
            return {
                ...state,
                viewedIngredient: null,
            };
        default:
            return state;
    }
};
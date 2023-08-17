import {
    ADD_VIEWED_INGREDIENT,
    CLEAR_VIEWED_INGREDIENT
} from '../actions/currentIngredient'

const initialState = {
    viewedIngredient: null,
} as const;

export const selectViewedIngredient = (state: any) => state.viewedIngredient;

export const ingredientDetailsReducer = (state = initialState, action: any) => {
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
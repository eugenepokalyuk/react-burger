import {
    ADD_VIEWED_INGREDIENT,
    CLEAR_VIEWED_INGREDIENT
} from '../actions/currentIngredient'

const initialState = {
    viewedIngredient: null,
};

export const selectViewedIngredient = (state) => state.viewedIngredient;

export const ingredientDetailsReducer = (state = initialState, action) => {
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
import {
    ADD_VIEWED_INGREDIENT,
    CLEAR_VIEWED_INGREDIENT
} from '../actions/currentIngredient'

// Экшен для добавления данных о просматриваемом ингредиенте
const addViewedIngredient = (ingredient) => ({
    type: ADD_VIEWED_INGREDIENT,
    payload: ingredient,
});

// Экшен для удаления данных о просматриваемом ингредиенте
const clearViewedIngredient = () => ({
    type: CLEAR_VIEWED_INGREDIENT,
});

const initialState = {
    viewedIngredient: null,
};

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
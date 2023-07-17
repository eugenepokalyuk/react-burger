import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE
} from '../actions/ingredients'

const initialState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const selectIngredients = (state) => state;
export const selectConstructorIngredients = (state) => state.constructorIngredients;
export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;
export const selectIngredientsLoading = (state) => state.loading;

export const ingredientsReducer = (state = initialState, action) => {
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
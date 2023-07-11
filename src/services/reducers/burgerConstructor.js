import {
    FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
    FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE
} from '../actions/burgerConstructor';

const initialState = {
    constructorIngredients: [],
    loading: false,
    error: null,
};

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS:
            return {
                ...state,
                constructorIngredients: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
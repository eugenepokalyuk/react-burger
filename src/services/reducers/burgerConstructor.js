import {
    FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
    FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE,
    ADD_INGREDIENT_TO_CONSTRUCTOR
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
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.payload],
            };
        default:
            return state;
    }
};
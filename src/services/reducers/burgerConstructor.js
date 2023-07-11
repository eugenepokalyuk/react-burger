import {
    FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
    FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE
} from '../actions/burgerConstructor';

// Экшен для запроса списка ингредиентов для конструктора бургера
const fetchConstructorIngredientsRequest = () => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
});

// Экшен для успешного получения списка ингредиентов для конструктора бургера
const fetchConstructorIngredientsSuccess = (ingredients) => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    payload: ingredients,
});

// Экшен для ошибки при получении списка ингредиентов для конструктора бургера
const fetchConstructorIngredientsFailure = (error) => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE,
    payload: error,
});

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
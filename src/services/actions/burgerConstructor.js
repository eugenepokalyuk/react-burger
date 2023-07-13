export const FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST = 'FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST';
export const FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS = 'FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS';
export const FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE = 'FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';

export const fetchConstructorIngredientsRequest = () => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
});

export const fetchConstructorIngredientsSuccess = (ingredients) => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    payload: ingredients,
});

export const fetchConstructorIngredientsFailure = (error) => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_FAILURE,
    payload: error,
});

export const addIngredientToConstructor = (ingredient) => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: ingredient,
});
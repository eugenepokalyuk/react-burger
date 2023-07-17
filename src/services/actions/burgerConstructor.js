import { v4 as uuidv4 } from 'uuid';

export const FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST = 'FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST';
export const FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS = 'FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS';
export const FETCH_CONSTRUCTOR_INGREDIENTS_ERROR = 'FETCH_CONSTRUCTOR_INGREDIENTS_ERROR';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
export const SET_BUN = 'SET_BUN';
export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT';


export const fetchConstructorIngredientsRequest = () => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
});

export const fetchConstructorIngredientsSuccess = (ingredients) => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    payload: ingredients,
});

export const fetchConstructorIngredientsFailure = (error) => ({
    type: FETCH_CONSTRUCTOR_INGREDIENTS_ERROR,
    payload: error,
});

export const addIngredientToConstructor = (ingredient) => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: {ingredient, uniqueId: uuidv4()}
});

export const removeIngredientFromConstructor = (ingredient) => ({
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: ingredient,
});

export const updateIngredientCount = (ingredientId, count) => {
  return {
    type: UPDATE_INGREDIENT_COUNT,
    payload: {
      ingredientId,
      count,
    },
  };
};

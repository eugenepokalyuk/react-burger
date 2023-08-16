import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../types';

export const FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST = 'FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST' as const;
export const FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS = 'FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS' as const;
export const FETCH_CONSTRUCTOR_INGREDIENTS_ERROR = 'FETCH_CONSTRUCTOR_INGREDIENTS_ERROR' as const;
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR' as const;
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' as const;
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR' as const;
export const SET_BUN = 'SET_BUN' as const;
export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT' as const;

export const fetchConstructorIngredientsRequest = () => ({
  type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
});

export const fetchConstructorIngredientsSuccess = (ingredients: string[]) => ({
  type: FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  payload: ingredients,
});

export const fetchConstructorIngredientsFailure = (error: any) => ({
  type: FETCH_CONSTRUCTOR_INGREDIENTS_ERROR,
  payload: error,
});

export const addIngredientToConstructor = (ingredient: Ingredient) => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  payload: { ...ingredient, uniqueId: uuidv4() },
});

export const removeIngredientFromConstructor = (ingredient: Ingredient) => ({
  type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  payload: ingredient,
});

export const updateIngredientCount = (ingredientId: string, count: number) => ({
  type: UPDATE_INGREDIENT_COUNT,
  payload: {
    ingredientId,
    count,
  },
});
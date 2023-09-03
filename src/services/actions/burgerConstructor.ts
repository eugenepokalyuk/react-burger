import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../types/types';

export const FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST: 'FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST' = 'FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST';
export const FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS: 'FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS' = 'FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS';
export const FETCH_CONSTRUCTOR_INGREDIENTS_ERROR: 'FETCH_CONSTRUCTOR_INGREDIENTS_ERROR' = 'FETCH_CONSTRUCTOR_INGREDIENTS_ERROR';
export const ADD_INGREDIENT_TO_CONSTRUCTOR: 'ADD_INGREDIENT_TO_CONSTRUCTOR' = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const MOVE_INGREDIENT_IN_CONSTRUCTOR: 'MOVE_INGREDIENT_IN_CONSTRUCTOR' = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
export const SET_BUN: 'SET_BUN' = 'SET_BUN';
export const UPDATE_INGREDIENT_COUNT: 'UPDATE_INGREDIENT_COUNT' = 'UPDATE_INGREDIENT_COUNT';
export const CLEAR_INGREDIENTS_IN_CONSTRUCTOR: 'CLEAR_INGREDIENTS_IN_CONSTRUCTOR' = 'CLEAR_INGREDIENTS_IN_CONSTRUCTOR';

// Типизация экшенов
export type TBurgerConstructor =
  | IFetchConstructorIngredientsRequestAction
  | IFetchConstructorIngredientsSuccessAction
  | IFetchConstructorIngredientsFailureAction
  | IAddIngredientToConstructorAction
  | IClearIngredientsInConstructorAction
  | IRemoveIngredientFromConstructorAction
  | IUpdateIngredientCountAction;

export interface IFetchConstructorIngredientsRequestAction {
  readonly type: typeof FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST;
}

export interface IFetchConstructorIngredientsSuccessAction {
  readonly type: typeof FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS;
  readonly payload: string[];
}

export interface IFetchConstructorIngredientsFailureAction {
  readonly type: typeof FETCH_CONSTRUCTOR_INGREDIENTS_ERROR;
  readonly payload: string;
}

export interface IAddIngredientToConstructorAction {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: object;
}

export interface IClearIngredientsInConstructorAction {
  readonly type: typeof CLEAR_INGREDIENTS_IN_CONSTRUCTOR;
}

export interface IRemoveIngredientFromConstructorAction {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: IIngredient;
}

export interface IUpdateIngredientCountAction {
  readonly type: typeof UPDATE_INGREDIENT_COUNT;
  readonly payload: {
    ingredientId: string,
    count: number
  };
}

// Генераторы экшенов

export const fetchConstructorIngredientsRequest = (): IFetchConstructorIngredientsRequestAction => ({
  type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
});

export const fetchConstructorIngredientsSuccess = (ingredients: string[]): IFetchConstructorIngredientsSuccessAction => ({
  type: FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  payload: ingredients,
});

export const fetchConstructorIngredientsFailure = (error: string): IFetchConstructorIngredientsFailureAction => ({
  type: FETCH_CONSTRUCTOR_INGREDIENTS_ERROR,
  payload: error,
});

export const addIngredientToConstructor = (ingredient: IIngredient): IAddIngredientToConstructorAction => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  payload: { ...ingredient, uniqueId: uuidv4() },
});

export const clearIngredientsInConstructor = (): IClearIngredientsInConstructorAction => ({
  type: CLEAR_INGREDIENTS_IN_CONSTRUCTOR,
});

export const removeIngredientFromConstructor = (ingredient: IIngredient): IRemoveIngredientFromConstructorAction => ({
  type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  payload: ingredient,
});

export const updateIngredientCount = (ingredientId: string, count: number): IUpdateIngredientCountAction => ({
  type: UPDATE_INGREDIENT_COUNT,
  payload: {
    ingredientId,
    count
  }
});
import { Ingredient } from "../types";

export const ADD_VIEWED_INGREDIENT: 'ADD_VIEWED_INGREDIENT' = 'ADD_VIEWED_INGREDIENT' as const;
export const CLEAR_VIEWED_INGREDIENT: 'CLEAR_VIEWED_INGREDIENT' = 'CLEAR_VIEWED_INGREDIENT' as const;

export type TCurrentIngredient =
    | IAddViewedIngredientAction
    | IClearViewedIngredientAction;

// Генераторы экшенов

export interface IAddViewedIngredientAction {
    readonly type: typeof ADD_VIEWED_INGREDIENT;
    readonly payload: Ingredient;
}

export interface IClearViewedIngredientAction {
    readonly type: typeof CLEAR_VIEWED_INGREDIENT;
}

export const addViewedIngredient = (ingredient: Ingredient): IAddViewedIngredientAction => ({
    type: ADD_VIEWED_INGREDIENT,
    payload: ingredient,
});

export const clearViewedIngredient = (): IClearViewedIngredientAction => ({
    type: CLEAR_VIEWED_INGREDIENT,
});
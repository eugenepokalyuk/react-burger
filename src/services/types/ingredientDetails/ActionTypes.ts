import {ADD_VIEWED_INGREDIENT, CLEAR_VIEWED_INGREDIENT} from "../../actions/currentIngredient";
import {IIngredient} from "../types";

interface IAddIngredientAction {
    type:typeof ADD_VIEWED_INGREDIENT;
    payload:IIngredient|null
}

interface IClearIngredientAction {
    type:typeof CLEAR_VIEWED_INGREDIENT;
}

export type ActionTypes =
    |IAddIngredientAction
    |IClearIngredientAction;

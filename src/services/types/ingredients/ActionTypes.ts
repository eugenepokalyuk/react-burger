import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
} from "../../actions/ingredients";
import { Ingredient, IIngredient } from "../types";


interface IIngredientsRequestAction {
    type: typeof FETCH_INGREDIENTS_REQUEST;
}


interface IIngredientsSuccessAction {
    type: typeof FETCH_INGREDIENTS_SUCCESS,
    payload: Ingredient
}

interface IIngredientsFailureAction {
    type: typeof FETCH_INGREDIENTS_FAILURE,
    payload: null | unknown
}


export type ActionTypes =
    | IIngredientsRequestAction
    | IIngredientsSuccessAction
    | IIngredientsFailureAction
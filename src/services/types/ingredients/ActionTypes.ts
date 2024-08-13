import {
    FETCH_INGREDIENTS_FAILURE,
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
} from "../../actions/ingredients";
import {IIngredient} from "../types";

interface IIngredientsRequestAction {
    type:typeof FETCH_INGREDIENTS_REQUEST;
}

interface IIngredientsSuccessAction {
    type:typeof FETCH_INGREDIENTS_SUCCESS,
    payload:IIngredient[]
}

interface IIngredientsFailureAction {
    type:typeof FETCH_INGREDIENTS_FAILURE,
    payload:null|unknown
}

export type ActionTypes =
    |IIngredientsRequestAction
    |IIngredientsSuccessAction
    |IIngredientsFailureAction

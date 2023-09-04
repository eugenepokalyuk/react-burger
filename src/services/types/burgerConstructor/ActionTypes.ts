import {
    FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
    FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    FETCH_CONSTRUCTOR_INGREDIENTS_ERROR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    SET_BUN,
    CLEAR_INGREDIENTS_IN_CONSTRUCTOR,
} from "../../actions/burgerConstructor";
import { IIngredient, BurgerConstructorBun } from "../types";

interface IIngredientsRequestAction {
    type: typeof FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST;
}

interface IIngredientsSuccessAction {
    type: typeof FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS;
    payload: IIngredient[];
}

interface IIngredientsErrorAction {
    type: typeof FETCH_CONSTRUCTOR_INGREDIENTS_ERROR;
    payload: null | unknown;
}

interface IAddIngredientAction {
    type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    payload: IIngredient;
}

interface IRemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
    key: string;
}

interface IMoveIngredientAction {
    type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
    payload: { dragIndex: number; hoverIndex: number };
}

interface IAddBunAction {
    type: typeof SET_BUN;
    payload: BurgerConstructorBun;
}

interface IClearIngredientsAction {
    type: typeof CLEAR_INGREDIENTS_IN_CONSTRUCTOR;
}

export type ActionTypes =
    | IIngredientsRequestAction
    | IIngredientsSuccessAction
    | IIngredientsErrorAction
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IAddBunAction
    | IClearIngredientsAction;
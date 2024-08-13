import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    CLEAR_INGREDIENTS_IN_CONSTRUCTOR,
    FETCH_CONSTRUCTOR_INGREDIENTS_ERROR,
    FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
    FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    SET_BUN,
} from "../../actions/burgerConstructor";
import {BurgerConstructorBun, IIngredient} from "../types";

interface IIngredientsRequestAction {
    type:typeof FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST;
}

interface IIngredientsSuccessAction {
    type:typeof FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS;
    payload:IIngredient[];
}

interface IIngredientsErrorAction {
    type:typeof FETCH_CONSTRUCTOR_INGREDIENTS_ERROR;
    payload:null|unknown;
}

interface IAddIngredientAction {
    type:typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    payload:IIngredient;
}

interface IRemoveIngredientAction {
    type:typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
    key:string;
}

interface IMoveIngredientAction {
    type:typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
    payload:{ dragIndex:number; hoverIndex:number };
}

interface IAddBunAction {
    type:typeof SET_BUN;
    payload:BurgerConstructorBun;
}

interface IClearIngredientsAction {
    type:typeof CLEAR_INGREDIENTS_IN_CONSTRUCTOR;
}

export type ActionTypes =
    |IIngredientsRequestAction
    |IIngredientsSuccessAction
    |IIngredientsErrorAction
    |IAddIngredientAction
    |IRemoveIngredientAction
    |IMoveIngredientAction
    |IAddBunAction
    |IClearIngredientsAction;

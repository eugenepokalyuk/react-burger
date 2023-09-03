import { fetchIngredientsData } from "../../utils/api";
import { FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST } from "./burgerConstructor";
import { IIngredient } from "../types/types";
import { useAppDispatch } from "../hooks/hooks";

export const FETCH_INGREDIENTS_REQUEST: "FETCH_INGREDIENTS_REQUEST" =
    "FETCH_INGREDIENTS_REQUEST";
export const FETCH_INGREDIENTS_SUCCESS: "FETCH_INGREDIENTS_SUCCESS" =
    "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILURE: "FETCH_INGREDIENTS_FAILURE" =
    "FETCH_INGREDIENTS_FAILURE";

export type TIngredients =
    | IFetchIngredientsRequestAction
    | IFetchIngredientsSuccessAction
    | IFetchIngredientsFailureAction;

export interface IFetchIngredientsRequestAction {
    readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export interface IFetchIngredientsSuccessAction {
    readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
    readonly payload: IIngredient[];
}

export interface IFetchIngredientsFailureAction {
    readonly type: typeof FETCH_INGREDIENTS_FAILURE;
    readonly payload: string;
}

export const fetchIngredientsRequest = (): IFetchIngredientsRequestAction => ({
    type: FETCH_INGREDIENTS_REQUEST,
});

enum ActionTypes {
    FETCH_INGREDIENTS_REQUEST = "FETCH_INGREDIENTS_REQUEST",
    FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS",
    FETCH_INGREDIENTS_FAILURE = "FETCH_INGREDIENTS_FAILURE",
    FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST = "FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST",
}

export const fetchIngredientsSuccess = (
    data: IIngredient[]
): IFetchIngredientsSuccessAction => ({
    type: ActionTypes.FETCH_INGREDIENTS_SUCCESS,
    payload: data,
});

export const fetchIngredientsFailure = (
    error: string
): IFetchIngredientsFailureAction => ({
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
});

export function getIngredients() {
    return function (dispatch: ReturnType<typeof useAppDispatch>) {
        dispatch({
            type: FETCH_INGREDIENTS_REQUEST,
        });

        fetchIngredientsData()
            .then((res) => {
                // todo: в диспатч должен передавать {type: ACTION_NAME}
                dispatch(res.data && fetchIngredientsSuccess(res.data));
                dispatch({
                    type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
                });
            })
            .catch((error) =>
                dispatch(fetchIngredientsFailure(error))
            );
    };
}
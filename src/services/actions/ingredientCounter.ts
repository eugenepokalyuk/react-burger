// нужен ли мне этот экшн?

export const UPDATE_INGREDIENT_COUNT: 'UPDATE_INGREDIENT_COUNT' = 'UPDATE_INGREDIENT_COUNT';

export type TIngredientCounter =
    | IUpdateIngredientCountAction;

export interface IUpdateIngredientCountAction {
    readonly type: typeof UPDATE_INGREDIENT_COUNT;
    readonly payload: {
        ingredientId: string, count: number
    }
}

export const updateIngredientCount = (ingredientId: string, count: number): IUpdateIngredientCountAction => {
    return {
        type: UPDATE_INGREDIENT_COUNT,
        payload: {
            ingredientId,
            count,
        },
    };
};
// нужен ли мне этот экшн?

export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT' as const;

export const updateIngredientCount = (ingredientId: string, count: number) => {
    return {
        type: UPDATE_INGREDIENT_COUNT,
        payload: {
            ingredientId,
            count,
        },
    };
};
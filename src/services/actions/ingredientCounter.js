export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT';

export const updateIngredientCount = (ingredientId, count) => {
    return {
        type: UPDATE_INGREDIENT_COUNT,
        payload: {
            ingredientId,
            count,
        },
    };
};
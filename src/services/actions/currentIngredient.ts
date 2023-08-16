export const ADD_VIEWED_INGREDIENT = 'ADD_VIEWED_INGREDIENT' as const;
export const CLEAR_VIEWED_INGREDIENT = 'CLEAR_VIEWED_INGREDIENT' as const;

export const addViewedIngredient = (ingredient: any) => ({
    type: ADD_VIEWED_INGREDIENT,
    payload: ingredient,
});

export const clearViewedIngredient = () => ({
    type: CLEAR_VIEWED_INGREDIENT,
});
import {
    FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
    FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
    FETCH_CONSTRUCTOR_INGREDIENTS_ERROR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,

    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    SET_BUN
} from '../actions/burgerConstructor';

const initialState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const constructorIngredientsReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_CONSTRUCTOR_INGREDIENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return action.payload.type === 'bun'
                ? { ...state, bun: action.payload }
                : { ...state, ingredients: state.ingredients ? [...state.ingredients, action.payload] : [action.payload] }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            // Либо для нахождения индекса использовать метод findIndex
            const index = state.ingredients.findIndex(item => item._id === action.key);
            if (index !== -1) {
                const updatedIngredients = [...state.ingredients];
                updatedIngredients.splice(index, 1);
                return {
                    ...state,
                    ingredients: updatedIngredients,
                };
            }
            return state;
        case MOVE_INGREDIENT_IN_CONSTRUCTOR:
            const { dragIndex, hoverIndex } = action.payload;
            const updatedIngredients = [...state.ingredients];
            const draggedItem = updatedIngredients[dragIndex];

            updatedIngredients.splice(dragIndex, 1);
            updatedIngredients.splice(hoverIndex, 0, draggedItem);

            return {
                ...state,
                ingredients: updatedIngredients,
            };
        case SET_BUN:
            return {
                ...state,
                bun: {
                    ...action.payload,
                    image: action.payload.image_large, // Обновляем поле image_large вместо image
                }
            };
        default:
            return state;
    }
};
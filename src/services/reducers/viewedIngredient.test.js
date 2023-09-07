import {
    ADD_VIEWED_INGREDIENT,
    CLEAR_VIEWED_INGREDIENT
} from '../actions/currentIngredient'
import { ingredientDetailsReducer } from './viewedIngredient'

const initialState = {
    viewedIngredient: null,
};

const mockData = {
    "_id": "643d69a5c3f7b9001cfa0949",
    "name": "Мини-салат Экзо-Плантаго",
    "type": "main",
    "proteins": 1,
    "fat": 2,
    "carbohydrates": 3,
    "calories": 6,
    "price": 4400,
    "image": "https://code.s3.yandex.net/react/code/salad.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
    "__v": 0,
};

describe("viewed ingredients reducer test 👇", () => {
    it("should handle ADD_VIEWED_INGREDIENT", () => {
        const action = { type: ADD_VIEWED_INGREDIENT, payload: mockData };
        const state = ingredientDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            viewedIngredient: action.payload
        });
    });

    it("should handle CLEAR_VIEWED_INGREDIENT", () => {
        const action = { type: CLEAR_VIEWED_INGREDIENT };
        const state = ingredientDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });

    it("should return the initial state for unknown action", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = ingredientDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });
});
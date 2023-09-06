import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
} from "../actions/ingredients";
import { ingredientsReducer } from "./ingredients";

const mockIngredients = [
    {
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
    },
    {
        "_id": "643d69a5c3f7b9001cfa0946",
        "name": "Хрустящие минеральные кольца",
        "type": "main",
        "proteins": 808,
        "fat": 689,
        "carbohydrates": 609,
        "calories": 986,
        "price": 300,
        "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
        "__v": 0
    },
];
const initialState = {
    ingredients: [],
    loading: false,
    error: null,
};

describe("ingredients reducer test 👇", () => {
    it("should handle FETCH_INGREDIENTS_REQUEST", () => {
        const action = { type: FETCH_INGREDIENTS_REQUEST };
        const state = ingredientsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null
        });
    });

    it("should handle FETCH_INGREDIENTS_SUCCESS", () => {
        const action = { type: FETCH_INGREDIENTS_SUCCESS, payload: mockIngredients };
        const state = ingredientsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            ingredients: action.payload,
            loading: true,
            error: null
        });
    });

    it("should handle FETCH_INGREDIENTS_FAILURE", () => {
        const error = new Error("Test error message");
        const action = { type: FETCH_INGREDIENTS_FAILURE, payload: error };
        const state = ingredientsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null
        });
    });

    it("should return the initial state for unknown action", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = ingredientsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });
});

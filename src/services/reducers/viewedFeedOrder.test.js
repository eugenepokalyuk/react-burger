import {
    ADD_VIEWED_ORDER,
    CLEAR_VIEWED_ORDER
} from '../actions/viewedFeedOrder'
import { feedDetailsReducer } from "./viewedFeedOrder";

const initialState = {
    viewedFeedOrder: null | undefined,
};

const mockData = {
    "_id": "643d69a5c3f7b9001cfa093d",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    "__v": 0
};

describe("viewedOrder reducer test 👇", () => {
    it("should handle ADD_VIEWED_ORDER", () => {
        const action = { type: ADD_VIEWED_ORDER, payload: mockData };
        const state = feedDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            viewedOrder: mockData,
        });
    });

    it("should handle CLEAR_VIEWED_ORDER", () => {
        const action = { type: CLEAR_VIEWED_ORDER };
        const state = feedDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            viewedOrder: null,
        });
    });

    it("should return the initial state for unknown action", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = feedDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });
});

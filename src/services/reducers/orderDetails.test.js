import {
    FETCH_ORDER_NUMBER_REQUEST,
    FETCH_ORDER_NUMBER_SUCCESS,
    FETCH_ORDER_NUMBER_FAILURE,
    UPDATE_ORDER_NUMBER
} from '../actions/orderDetails'
import { orderDetailsReducer } from "./orderDetails";

const mockData = 19573;

const initialState = {
    orderNumber: null,
    loading: false,
    error: null,
};

describe("orderDetails reducer test 👇", () => {
    it("should handle FETCH_ORDER_NUMBER_REQUEST", () => {
        const action = { type: FETCH_ORDER_NUMBER_REQUEST };
        const state = orderDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null
        });
        expect(state.loading).toBe(true);
    });

    it("should handle FETCH_ORDER_NUMBER_SUCCESS", () => {
        const action = { type: FETCH_ORDER_NUMBER_SUCCESS, payload: mockData };
        const state = orderDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            orderNumber: action.payload,
            loading: false,
            error: null
        });
        expect(state.loading).toBe(false);
    });

    it("should handle FETCH_ORDER_NUMBER_FAILURE", () => {
        const error = new Error("Test error message");
        const action = { type: FETCH_ORDER_NUMBER_FAILURE, payload: error.message };
        const state = orderDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: error.message
        });
        expect(state.loading).toBe(false);
    });

    it("should handle UPDATE_ORDER_NUMBER", () => {
        const action = { type: UPDATE_ORDER_NUMBER, payload: mockData };
        const state = orderDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            orderNumber: action.payload,
        });
        expect(state.loading).toBe(false);
    });

    it("should return the initial state for unknown action", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = orderDetailsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });
});

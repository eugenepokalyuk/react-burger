import { wsReducer } from "./WSReducers";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,

    WS_GET_ORDERS,

    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_SUCCESS,

    WS_GET_AUTH_ORDERS,

    WS_AUTH_CONNECTION_CLOSED
} from "../actions/WSActions";

export const initialState = {
    wsConnected: false,
    wsError: undefined,
    wsAuthConnected: false,
    wsAuthError: undefined,
    orders: [],
    userOrders: [],
    total: 0,
    totalToday: 0,
}

const mockData = {
    orders: [{
        _id: '64f98f236d2997001caa6b0a',
        ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2023-09-07T08:51:47.795Z',
        updatedAt: '2023-09-07T08:51:47.981Z',
        number: 19524
    },
    {
        _id: '64f98f196d2997001caa6b08',
        ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2023-09-07T08:51:37.264Z',
        updatedAt: '2023-09-07T08:51:37.449Z',
        number: 19523
    }],
    total: 19198,
    totalToday: 76
};

describe('ws reducer tests', () => {
    it('should handle WS_CONNECTION_START', () => {
        const action = { type: WS_CONNECTION_START };
        const state = wsReducer(initialState, action);

        expect(state)
            .toEqual({
                ...initialState,
            });
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        const error = new Error("Test error message");
        const action = { type: WS_CONNECTION_ERROR, payload: error.message };
        const state = wsReducer(initialState, action);
        expect(state)
            .toEqual({
                ...initialState,
                wsError: error.message
            });
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const action = { type: WS_CONNECTION_SUCCESS };
        const state = wsReducer(initialState, action);
        expect(state)
            .toEqual({
                ...initialState,
                wsConnected: true,
            });
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        const action = { type: WS_CONNECTION_CLOSED };
        const state = wsReducer(initialState, action);
        expect(state)
            .toEqual({
                ...initialState
            });
    });

    it('should handle WS_GET_ORDERS', () => {
        const action = { type: WS_GET_ORDERS, payload: mockData };
        const state = wsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            wsConnected: true,
            orders: mockData.orders,
            total: mockData.total,
            totalToday: mockData.totalToday,
        });
    });

    it('should handle WS_AUTH_CONNECTION_START', () => {
        const action = { type: WS_AUTH_CONNECTION_START };
        const state = wsReducer(initialState, action);
        expect(state)
            .toEqual({
                ...initialState,
            });
    });

    it('should handle WS_AUTH_CONNECTION_ERROR', () => {
        const error = new Error("Test error message");
        const action = { type: WS_AUTH_CONNECTION_ERROR, payload: error.message };
        const state = wsReducer(initialState, action);
        expect(state)
            .toEqual({
                ...initialState,
                wsAuthError: error.message
            });
    });

    it('should handle WS_AUTH_CONNECTION_SUCCESS', () => {
        const action = { type: WS_AUTH_CONNECTION_SUCCESS };
        const state = wsReducer(initialState, action);
        expect(state)
            .toEqual({
                ...initialState,
                wsAuthConnected: true,
            });
    });

    it('should handle WS_GET_AUTH_ORDERS', () => {
        const action = { type: WS_GET_AUTH_ORDERS, payload: mockData };
        const state = wsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            wsAuthConnected: true,
            userOrders: mockData.orders,
            total: mockData.total,
            totalToday: mockData.totalToday,
        });
    });

    it('should handle WS_AUTH_CONNECTION_CLOSED', () => {
        const action = { type: WS_AUTH_CONNECTION_CLOSED };
        const state = wsReducer(initialState, action);
        expect(state)
            .toEqual({
                ...initialState
            });
    });

    it("should return the initial state for unknown action", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const state = wsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });
});
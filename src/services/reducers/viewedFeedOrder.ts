import {
    ADD_VIEWED_ORDER,
    CLEAR_VIEWED_ORDER,
    TViewedOrder
} from '../actions/viewedFeedOrder'

const initialState = {
    viewedOrder: null,
} as const;

export const selectViewedOrder = (state: any) => state.viewedOrder;

export const feedDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_VIEWED_ORDER:
            return {
                ...state,
                viewedOrder: action.payload,
            };
        case CLEAR_VIEWED_ORDER:
            return {
                ...state,
                viewedOrder: null,
            };
        default:
            return state;
    }
};
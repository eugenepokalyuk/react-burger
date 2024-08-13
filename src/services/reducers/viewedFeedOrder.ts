import {ADD_VIEWED_ORDER, CLEAR_VIEWED_ORDER} from '../actions/viewedFeedOrder'
import {IViewedFeedOrderState} from '../types/types';
import {ActionTypes} from '../types/viewedFeedOrder/ActionTypes';

const initialState:IViewedFeedOrderState = {
    viewedFeedOrder: null,
};

export const feedDetailsReducer = (state = initialState, action:ActionTypes) => {
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

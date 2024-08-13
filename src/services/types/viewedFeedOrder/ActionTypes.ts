import {ADD_VIEWED_ORDER, CLEAR_VIEWED_ORDER} from '../../actions/viewedFeedOrder';
import {TWSOrder} from '../types'

interface IAddViewdOrderAction {
    type:typeof ADD_VIEWED_ORDER;
    payload:TWSOrder
}

interface IClearViewedOrderAction {
    type:typeof CLEAR_VIEWED_ORDER;
}

export type ActionTypes =
    |IAddViewdOrderAction
    |IClearViewedOrderAction;

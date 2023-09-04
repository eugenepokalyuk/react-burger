import {
    GET_USER_SUCCESS,
    CHECK_USER_FAILURE,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    USER_STATEMENT,
    CLEAR_USER_CREDS
} from '../../actions/authActions'
import { TUser } from '../types';

interface IGetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    payload: TUser
}

interface ICheckUserFailureAction {
    type: typeof CHECK_USER_FAILURE;
    payload: null | unknown
}

interface IRefreshTokenSuccessAction {
    type: typeof REFRESH_TOKEN_SUCCESS;
}

interface IRefreshTokenFailureAction {
    type: typeof REFRESH_TOKEN_FAILURE;
    payload: null | unknown
}

interface IUserStatementAction {
    type: typeof USER_STATEMENT;
    payload: TUser
}

interface IClearUserCredsAction {
    type: typeof CLEAR_USER_CREDS;
}

export type ActionTypes =
    | IGetUserSuccessAction
    | ICheckUserFailureAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailureAction
    | IUserStatementAction
    | IClearUserCredsAction;
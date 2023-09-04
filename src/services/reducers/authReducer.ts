import {
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  USER_STATEMENT,
  GET_USER_SUCCESS,
  CHECK_USER_FAILURE,
  CLEAR_USER_CREDS
} from "../actions/authActions";
import { ActionTypes } from "../types/auth/ActionTypes";
import { IAuthState, RootState } from "../types/types";

const initialState: IAuthState = {
  user: null,
  error: null,
};

export const selectUserCredentials = (state: RootState) => state.auth;

export const authReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case CHECK_USER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case USER_STATEMENT:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case CLEAR_USER_CREDS:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
};
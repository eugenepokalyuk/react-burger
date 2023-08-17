import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  EDIT_SUCCESS,

  LOGIN_FAILURE,
  REGISTER_FAILURE,
  EDIT_FAILURE,

  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,

  USER_STATEMENT,

  GET_USER_SUCCESS,
  CHECK_USER_FAILURE,
} from '../actions/authActions'

const initialState = {
  user: null,
  error: null,
} as const;

export const selectUserCredentials = (state: any) => state.auth;

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case EDIT_SUCCESS:
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case EDIT_FAILURE:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
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
      }
    default:
      return state;
  }
};
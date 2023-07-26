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

  USER_STATEMENT
} from '../actions/authActions'

const initialState = {
  user: null,
  error: null,
};

export const selectUserCredentials = (state) => state.auth;

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case EDIT_SUCCESS:
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
import {
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  USER_STATEMENT,
  GET_USER_SUCCESS,
  CHECK_USER_FAILURE,
  CLEAR_USER_CREDS
} from "../actions/authActions";
import { authReducer } from './authReducer';

const initialState = {
  user: null,
  error: null,
};

const mockData = {
  accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjNhODQ4NmQyOTk3MDAxY2FhNWFjMCIsImlhdCI6MTY5NDEwNTU3NCwiZXhwIjoxNjk0MTA2Nzc0fQ.j_S5zwFQLOrx0ZhE4DcfwUAoIJA4j4XaJj7wg2aqaBo',
  refreshToken: 'ee075525ef88e222feb825be679a4c53d5d225bfc912a8c6763d0dc767b57141dfa2c3a010ea798c',
  email: '123123@gmail.com',
  name: '123123',
  password: '123123'
};

describe("viewed ingredients reducer test 👇", () => {
  it("should handle REFRESH_TOKEN_SUCCESS", () => {
    const action = { type: REFRESH_TOKEN_SUCCESS };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
    });
  });

  it("should handle REFRESH_TOKEN_FAILURE", () => {
    const error = new Error("Test error message");

    const action = { type: REFRESH_TOKEN_FAILURE, payload: error.message };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      // user: null,
      error: error.message
    });
  });

  it("should handle USER_STATEMENT", () => {
    const action = { type: USER_STATEMENT, payload: mockData };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: action.payload
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    const action = { type: GET_USER_SUCCESS, payload: mockData };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: action.payload,
    });
  });

  it("should handle CHECK_USER_FAILURE", () => {
    const error = new Error("Test error message");
    const action = { type: CHECK_USER_FAILURE, payload: error.message };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      // user: null,
      error: error.message
    });
  });

  it("should handle CLEAR_USER_CREDS", () => {
    const action = { type: CLEAR_USER_CREDS };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
    });
  });

  it("should return the initial state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
    });
  });
});
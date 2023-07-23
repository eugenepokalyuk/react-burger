// authActions.js
import api from './api';

// Авторизация пользователя
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await api.login(email, password);
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
  }
};

// Регистрация пользователя
export const register = (email, password, name) => async (dispatch) => {
  try {
    const { data } = await api.register(email, password, name);
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.message });
  }
};

// Выход из системы
export const logout = (refreshToken) => async (dispatch) => {
  try {
    await api.logout(refreshToken);
    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'LOGOUT_FAILURE', payload: error.response.data.message });
  }
};
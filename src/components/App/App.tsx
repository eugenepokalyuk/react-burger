import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, ProfileHistory, IngredientPage, NotFound } from '../../pages';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_FAILURE } from '../../services/actions/ingredients'
import { CHECK_USER_REQUEST, GET_USER_SUCCESS, CHECK_USER_FAILURE } from '../../services/actions/authActions'
import { fetchIngredientsData, getUsers } from '../../utils/api';
import {
  DEFAULT_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  PROFILE_PATH,
  PROFILE_ORDERS_PATH,
  PROFILE_ORDERS_ID_PATH,
  FEED_PATH,
  INGREDIENTS_PATH,
  ERROR_PATH
} from '../../utils/routePath';

import { useAppDispatch } from '../../services/hooks/hooks';

const App = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    fetchIngredientsData()
      .then(res => {
        dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: FETCH_INGREDIENTS_FAILURE });
      });

    if (localStorage.getItem('accessToken')) {
      dispatch({ type: CHECK_USER_REQUEST });
      getUsers()
        .then(res => {
          dispatch({ type: GET_USER_SUCCESS, payload: res });
        })
        .catch(error => {
          localStorage.clear();
          dispatch({ type: CHECK_USER_FAILURE });
        });
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />

      <Routes location={background || location}>

        <Route path={DEFAULT_PATH} element={<HomePage />} />

        <Route
          path={LOGIN_PATH}
          element={<ProtectedRoute auth={false} children={<LoginPage />} />}
        />

        <Route
          path={REGISTER_PATH}
          element={<ProtectedRoute auth={false} children={<RegisterPage />} />}
        />

        <Route
          path={FORGOT_PASSWORD_PATH}
          element={<ProtectedRoute auth={false} children={<ForgotPasswordPage />} />}
        />

        <Route
          path={RESET_PASSWORD_PATH}
          element={<ProtectedRoute auth={false} children={<ResetPasswordPage />} />}
        />

        <Route
          path={PROFILE_PATH}
          element={<ProtectedRoute auth={true} children={<ProfilePage />} />}
        />

        <Route
          path={PROFILE_ORDERS_PATH}
          element={<ProtectedRoute auth={true} children={<ProfileHistory />} />}
        />

        <Route
          path={PROFILE_ORDERS_ID_PATH}
          element={<ProtectedRoute auth={true} children={<ProfilePage />} />}
        />

        <Route
          path={FEED_PATH}
          element={<NotFound />}
        />

        <Route
          path={INGREDIENTS_PATH}
          element={<IngredientPage />}
        />

        <Route
          path={ERROR_PATH}
          element={<NotFound />}
        />

      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={INGREDIENTS_PATH}
            element={<IngredientPage />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
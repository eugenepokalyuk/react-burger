import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, ProfileHistory, IngredientPage, NotFound } from '../../pages';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_FAILURE } from '../../services/actions/ingredients'
import { fetchIngredientsData } from '../../utils/api';


const App = () => {
  const dispatch = useDispatch();
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

    // dispatch(getUsers)
  }, [dispatch]);

  return (
    <>
      <AppHeader />

      <Routes location={background || location}>

        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={<ProtectedRoute auth={false} children={<LoginPage />} />}
        />

        <Route
          path="/register"
          element={<ProtectedRoute auth={false} children={<RegisterPage />} />}
        />

        <Route
          path="/forgot-password"
          element={<ProtectedRoute auth={false} children={<ForgotPasswordPage />} />}
        />

        <Route
          path="/reset-password"
          element={<ProtectedRoute auth={false} children={<ResetPasswordPage />} />}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute auth={true} children={<ProfilePage />} />}
        />

        <Route
          path="/profile/orders"
          element={<ProtectedRoute auth={true} children={<ProfileHistory />} />}
        />

        <Route
          path="/profile/orders/:id"
          element={<ProtectedRoute auth={true} children={<ProfilePage />} />}
        />

        <Route
          path="/feed"
          element={<NotFound />}
        />

        <Route
          path="/ingredients/:id"
          element={<IngredientPage />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
      
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={<IngredientPage />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
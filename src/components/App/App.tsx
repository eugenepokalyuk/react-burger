import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, ProfileHistory, IngredientPage, NotFound } from '../../pages';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { fetchIngredientsRequest } from '../../services/actions/ingredients';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsRequest());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
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
    </BrowserRouter>
  );
};

export default App;

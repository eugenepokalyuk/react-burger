import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, NotFound } from '../../pages';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/orders" element={<ProfilePage />} />
        <Route path="/profile/orders/:id" element={<ProfilePage />} />

        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, ProfileFeed, IngredientPage, NotFound, OrderFeed } from '../../pages';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_FAILURE } from '../../services/actions/ingredients'
import { GET_USER_SUCCESS, CHECK_USER_FAILURE } from '../../services/actions/authActions'
import { fetchIngredientsData, getUsers } from '../../utils/api';
import { DEFAULT_PATH, LOGIN_PATH, REGISTER_PATH, FORGOT_PASSWORD_PATH, RESET_PASSWORD_PATH, PROFILE_PATH, PROFILE_ORDERS_PATH, PROFILE_ORDERS_ID_PATH, FEED_PATH, FEED_ID_PATH, INGREDIENTS_PATH, ERROR_PATH } from '../../utils/routePath';
import { useAppDispatch } from '../../services/hooks/hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/WSActions';
import FeedItemDetails from '../OrderFeedItemDetails/OrderFeedItemDetails';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from "./App.module.css";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, isLoading] = useState<boolean>(Boolean);
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  const closeModal = () => {
    // navigate(-1);
  };

  useEffect(() => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });

    isLoading(true);

    fetchIngredientsData()
      .then(res => {
        dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: error });
      });

    if (localStorage.getItem('accessToken')) {
      getUsers()
        .then(res => {
          dispatch({ type: GET_USER_SUCCESS, payload: res });
        })
        .catch(error => {
          localStorage.clear();
          dispatch({ type: CHECK_USER_FAILURE, payload: error });
        });
    }

    dispatch({ type: WS_CONNECTION_START, payload: '/all' });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />

      {loading ?
        <>
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
              element={<ProtectedRoute auth={true} children={<ProfileFeed />} />}
            />

            <Route
              path={PROFILE_ORDERS_ID_PATH}
              element={<ProtectedRoute auth={true} children={<FeedItemDetails />} />}
            />

            <Route
              path={FEED_PATH}
              element={<OrderFeed />}
            />

            <Route
              path={FEED_ID_PATH}
              element={<FeedItemDetails />}
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

          {background && (
            <Routes>

              <Route
                path={INGREDIENTS_PATH}
                element={
                  <IngredientPage />
                }
              />

              <Route
                path={FEED_ID_PATH}
                element={
                  <Modal onClose={handleModalClose}>
                    <FeedItemDetails isModal />
                  </Modal>
                }
              />

              <Route
                path={PROFILE_ORDERS_ID_PATH}
                element={<ProtectedRoute auth={true} children={
                  <Modal onClose={handleModalClose}>
                    <FeedItemDetails isModal />
                  </Modal>
                } />}
              />
            </Routes>
          )}
        </> :
        <Modal onClose={closeModal} header="Загрузка данных">
          <div className="mb-4 mt-4">
          </div>
          <div>
            <p className="text text_type_main-medium mb-8">
              Пожалуйста подождите
            </p>
            <div className={`${styles.flex} text_color_inactive`}>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="5x"
                className={`${styles.faSpinner}`}
              />
            </div>
          </div>
        </Modal>}
    </>
  );
};

export default App;
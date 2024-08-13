import {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';

import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    ForgotPasswordPage,
    HomePage,
    IngredientPage,
    LoginPage,
    NotFound,
    OrderFeed,
    ProfileFeed,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage
} from '../../pages';
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from '../../services/actions/WSActions';
import {CHECK_USER_FAILURE, GET_USER_SUCCESS} from '../../services/actions/authActions';
import {
    FETCH_INGREDIENTS_FAILURE,
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS
} from '../../services/actions/ingredients';
import {useAppDispatch} from '../../services/hooks/hooks';
import {fetchIngredientsData, getUsers} from '../../utils/api';
import {
    DEFAULT_PATH,
    ERROR_PATH,
    FEED_ID_PATH,
    FEED_PATH,
    FORGOT_PASSWORD_PATH,
    INGREDIENTS_PATH,
    LOGIN_PATH,
    PROFILE_ORDERS_ID_PATH,
    PROFILE_ORDERS_PATH,
    PROFILE_PATH,
    REGISTER_PATH,
    RESET_PASSWORD_PATH
} from '../../utils/routePath';
import {AppHeader} from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import FeedItemDetails from '../OrderFeedItemDetails/OrderFeedItemDetails';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import styles from "./App.module.css";

const App = () => {
    const dispatch = useAppDispatch();

    const location = useLocation();

    const navigate = useNavigate();

    const [loading, isLoading] = useState<boolean>(false);

    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    const closeModal = () => {
        navigate(-1);
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
            <AppHeader/>
            {loading ?
                <>
                    <Routes location={background || location}>
                        <Route path={DEFAULT_PATH} element={<HomePage/>}/>

                        <Route path={LOGIN_PATH} element={<ProtectedRoute auth={false} children={<LoginPage/>}/>}/>

                        <Route path={REGISTER_PATH}
                               element={<ProtectedRoute auth={false} children={<RegisterPage/>}/>}/>

                        <Route path={FORGOT_PASSWORD_PATH}
                               element={<ProtectedRoute auth={false} children={<ForgotPasswordPage/>}/>}/>

                        <Route path={RESET_PASSWORD_PATH}
                               element={<ProtectedRoute auth={false} children={<ResetPasswordPage/>}/>}/>

                        <Route path={PROFILE_PATH} element={<ProtectedRoute auth={true} children={<ProfilePage/>}/>}/>

                        <Route path={PROFILE_ORDERS_PATH}
                               element={<ProtectedRoute auth={true} children={<ProfileFeed/>}/>}/>

                        <Route path={PROFILE_ORDERS_ID_PATH}
                               element={<ProtectedRoute auth={true} children={<FeedItemDetails/>}/>}/>

                        <Route path={FEED_PATH} element={<OrderFeed/>}/>

                        <Route path={FEED_ID_PATH} element={<FeedItemDetails/>}/>

                        <Route path={INGREDIENTS_PATH} element={<IngredientPage/>}/>

                        <Route path={ERROR_PATH} element={<NotFound/>}/>
                    </Routes>

                    {background && (
                        <Routes>

                            <Route
                                path={INGREDIENTS_PATH}
                                element={
                                    <Modal onClose={handleModalClose}>
                                        <IngredientPage/>
                                    </Modal>
                                }
                            />

                            <Route
                                path={FEED_ID_PATH}
                                element={
                                    <Modal onClose={handleModalClose}>
                                        <FeedItemDetails isModal/>
                                    </Modal>
                                }
                            />

                            <Route
                                path={PROFILE_ORDERS_ID_PATH}
                                element={<ProtectedRoute auth={true} children={
                                    <Modal onClose={handleModalClose}>
                                        <FeedItemDetails isModal/>
                                    </Modal>
                                }/>}
                            />
                        </Routes>
                    )}
                </> : (
                    <Modal onClose={closeModal} header="Загрузка данных">
                        <div className="mb-4 mt-4"></div>

                        <div>
                            <p className="text text_type_main-medium text_color_inactive mb-8">
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
                    </Modal>
                )}
        </>
    );
};

export default App;

import React, { FC, useEffect, useState } from 'react';
import styles from './OrderFeed.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import OrderFeedItem from '../OrderFeedItem/OrderFeedItem';
import OrderFeedStat from '../OrderFeedStat/OrderFeedStat';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/WSActions';
import { selectUserCredentials } from '../../services/reducers/authReducer';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderFeed: FC = () => {
    const dispatch = useAppDispatch();
    const [, setIsModalOpen] = useState<boolean>(false);
    const orders = useAppSelector(store => store.wsReducer.orders)
    const location = useLocation();
    const [loading, isLoading] = useState<boolean>(Boolean);
    const { user: AuthUser } = useAppSelector(selectUserCredentials);
    const navigate = useNavigate();

    const handleAuthClick = async () => {
        navigate("/login", { replace: true });
    };

    const handleOrderClick = async () => {
        navigate("/", { replace: true });
    };

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: '/all' });
        isLoading(true);
        return () => { dispatch({ type: WS_CONNECTION_CLOSED }); }
    }, [dispatch]);

    return (
        <section className={styles.container}>
            <h1 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h1>
            <div className={styles.wrapper}>

                <div className={`${styles.w100} ${styles.scrollable}`}>
                    {loading
                        ? orders.map((order) => (
                            <OrderFeedItem
                                key={uuidv4()}
                                order={order}
                                showStatus={false}
                                parentURL={location}
                                state={{ background: location }}
                                setIsModalOpen={setIsModalOpen}
                            />
                        ))
                        : <div>
                            <div className={`${styles.orderFeedEmptyItem} mb-8`}>
                                <h2 className='mb-4'>Заказов нет!</h2>
                                <p className='text text_type_main-default'>Но вы всегда можете создать новый!</p>
                            </div>
                            <div className={`${styles.orderFeedEmptyButton}`}>
                                {AuthUser ? (
                                    <Button
                                        htmlType="button"
                                        type="primary"
                                        size="large"
                                        onClick={handleOrderClick}
                                    >
                                        Собрать бургер
                                    </Button>
                                ) : (
                                    <Button
                                        htmlType="button"
                                        type="primary"
                                        size="large"
                                        onClick={handleAuthClick}
                                        disabled={false}
                                    >
                                        Авторизация
                                    </Button>
                                )}
                            </div>
                        </div>}
                </div>

                <div className={styles.w100}>
                    {loading
                        ? <OrderFeedStat />
                        : <OrderFeedStat isEmpty />
                    }
                </div>

            </div>
        </section>
    );
}
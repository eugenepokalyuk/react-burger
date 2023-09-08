import { FC, useEffect, useState } from 'react';
import styles from './OrderFeed.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import OrderFeedItem from '../OrderFeedItem/OrderFeedItem';
import OrderFeedStat from '../OrderFeedStat/OrderFeedStat';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/WSActions';
import { OrderNotFound } from '../OrderNotFound/OrderNotFound';

export const OrderFeed: FC = () => {
    const dispatch = useAppDispatch();
    const [, setIsModalOpen] = useState<boolean>(false);
    const orders = useAppSelector(store => store.wsReducer.orders)
    const location = useLocation();
    const [loading, isLoading] = useState<boolean>(Boolean);

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
                        : <OrderNotFound />}
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
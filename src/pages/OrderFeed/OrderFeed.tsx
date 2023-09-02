import React, { FC, useState } from 'react';
import styles from './OrderFeed.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks/hooks';
import OrderFeedItem from '../../components/OrderFeedItem/OrderFeedItem';
import OrderFeedStat from '../../components/OrderFeedStat/OrderFeedStat';

export const OrderFeed: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { orders } = useAppSelector(store => (store.wsReducer));
    const location = useLocation();

    return (
        <section className={styles.container}>
            <h1 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h1>
            <div className={styles.wrapper}>

                <div className={`${styles.w100} ${styles.scrollable}`}>
                    {orders.map((order) => (
                        <OrderFeedItem
                            key={uuidv4()}
                            order={order}
                            showStatus={false}
                            parentURL={location}
                            state={{ background: location }}
                            setIsModalOpen={setIsModalOpen}
                        />
                    ))}
                </div>

                <div className={styles.w100}>
                    <OrderFeedStat />
                </div>

            </div>
        </section>
    );
}
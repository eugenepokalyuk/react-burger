import React, { FC } from 'react';
import styles from './OrderFeed.module.css';
import data from '../../utils/orderFeedData.json';
import { OrderData } from '../../services/types'
import FeedItem from '../../components/FeedItem/FeedItem';
import FeedStat from '../../components/FeedStat/FeedStat';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

export const OrderFeed: FC = () => {
    const { success, orders } = data as OrderData;
    const location = useLocation();
    return (
        <section className={styles.container}>
            <h1 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h1>
            <div className={styles.wrapper}>

                <div className={`${styles.w100} ${styles.scrollable}`}>
                    {success && orders.map((order) => (
                        <FeedItem
                            key={uuidv4()}
                            order={order}
                            showStatus={false}
                            parentURL={location}
                        />
                    ))}
                </div>

                <div className={styles.w100}>
                    <FeedStat />
                </div>

            </div>
        </section>
    );
}
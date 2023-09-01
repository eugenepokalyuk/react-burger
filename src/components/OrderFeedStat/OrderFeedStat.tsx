import React, { FC } from 'react';
import styles from './OrderFeedStat.module.css';
import { useAppSelector } from '../../services/hooks/hooks';
import { TWSOrder } from '../../services/types';
import { v4 as uuidv4 } from 'uuid';

const FeedStat: FC = () => {
    const { orders } = useAppSelector(store => (store.wsReducer));
    const { total } = useAppSelector(store => (store.wsReducer));
    const { totalToday } = useAppSelector(store => (store.wsReducer));
    return (
        <>
            <div className={`${styles.flex}`}>
                <div className={`${styles.w50} mr-9`}>
                    <h1 className='text text_type_main-medium mb-6'>Готовы:</h1>
                    <ul className={`${styles.orderList}`}>
                        {orders.slice(0, 20).map((order: TWSOrder) => (
                            order.status === "done" ? (
                                <li key={uuidv4()}
                                    className={`${styles.orderItem} text text_type_digits-default mb-2`}>
                                    {order.number}
                                </li>
                            ) : <p className='text text_type_main-small'>Все заказы выполнены!</p>
                        ))}
                    </ul>
                </div>

                <div className={styles.w50}>
                    <h1 className='text text_type_main-medium mb-6'>В работе:</h1>
                    {/* {orders.length > 0 ? orders.slice(0, 20).map((order: TWSOrder) => (
                        order.status !== "done" && (
                            <li key={uuidv4()}
                                className={`${styles.orderItem} text text_type_digits-default mb-2`}>
                                {order.number}
                            </li>
                        )
                    )) : <p className='text text_type_main-small'>Все текущие заказы готовы!</p>} */}
                    {
                        orders.length > 0 ? (
                            orders.slice(0, 20).map((order: TWSOrder) => (
                                order.status !== "done" ? (
                                    <li
                                        key={uuidv4()}
                                        className={`${styles.orderItem} text text_type_digits-default mb-2`}
                                    >
                                        {order.number}
                                    </li>
                                ) : null
                            ))
                        ) : (
                            <p className="text text_type_main-small">Все текущие заказы готовы!</p>
                        )
                    }
                </div>
            </div>

            <div className='mt-15'>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={`${styles.textShadows} text text_type_digits-large`}>{total}</p>
            </div>

            <div className='mt-15'>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={`${styles.textShadows} text text_type_digits-large`}>{totalToday}</p>
            </div>
        </>
    )
}

export default FeedStat;
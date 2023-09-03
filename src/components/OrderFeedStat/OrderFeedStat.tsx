import React, { FC, useMemo } from 'react';
import styles from './OrderFeedStat.module.css';
import { useAppSelector } from '../../services/hooks/hooks';
import { TWSOrder } from '../../services/types/types';

const OrderFeedStat: FC = () => {
    const orders = useAppSelector(store => (store.wsReducer.orders));
    const total = useAppSelector(store => (store.wsReducer.total));
    const totalToday = useAppSelector(store => (store.wsReducer.totalToday));

    const pendingOrders = useMemo(
        () =>
            orders.filter((order: TWSOrder) => order.status === 'pending'),
        [orders]
    );

    return (
        <>
            <div className={`${styles.flex}`}>
                <div className={`${styles.w50} mr-9`}>
                    <h1 className='text text_type_main-medium mb-6'>Готовы:</h1>
                    <ul className={`${styles.orderList}`}>
                        {orders.slice(0, 20).map((order: TWSOrder, index: number) => (
                            order.status === "done" && (
                                <li key={index}
                                    className={`${styles.orderItem} text text_type_digits-default mb-2`}>
                                    {order.number}
                                </li>
                            )
                        ))}
                    </ul>
                </div>

                <div className={styles.w50}>
                    <h1 className='text text_type_main-medium mb-6'>В работе:</h1>
                    {pendingOrders.length > 0 ? (
                        orders.slice(0, 50).map(
                            (order: TWSOrder, index: number) =>
                            (
                                order.status !== "done"
                                && (
                                    <li
                                        key={index}
                                        className={`${styles.orderItem} ${styles.colorWhite} text text_type_digits-default mb-2`}
                                    >
                                        {order.number}
                                    </li>
                                )
                            )
                        )
                    ) : (
                        <p className="text text_type_main-small">Все текущие заказы готовы!</p>
                    )}
                    {/* {
                        orders.length > 0
                            ? (
                                orders.slice(0, 50).map(
                                    (order: TWSOrder, index: number) =>
                                    (
                                        order.status !== "done"
                                        && (
                                            <li
                                                key={index}
                                                className={`${styles.orderItem} ${styles.colorWhite} text text_type_digits-default mb-2`}
                                            >
                                                {order.number}
                                            </li>
                                        )
                                    )
                                )
                            ) : (
                                <p className="text text_type_main-small">Все текущие заказы готовы!</p>
                            )
                    } */}
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

export default OrderFeedStat;
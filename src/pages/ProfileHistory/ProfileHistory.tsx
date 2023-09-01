import React, { FC } from 'react';
import styles from './ProfileHistory.module.css'
import { Link, useLocation, NavLink } from 'react-router-dom';
import OrderFeedItem from '../../components/OrderFeedItem/OrderFeedItem';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../services/hooks/hooks';

export const ProfileHistory: FC = () => {
    const location = useLocation();
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container} mr-15`}>
                <ul className={`mb-20 text text_type_main-medium text_color_inactive ${styles.listLinks}`}>
                    <li className='mb-4'>
                        <NavLink to='/profile' className={location.pathname === '/profile' ? styles.activeNavLink : `${styles.link} text_color_inactive`} >
                            Профиль
                        </NavLink>
                    </li>
                    <li className='mb-4'>
                        <NavLink to='/profile/orders' className={location.pathname === '/profile/orders' ? styles.activeNavLink : `${styles.link} text_color_inactive`} >
                            История заказов
                        </NavLink>
                    </li>
                    <li className='mb-4'>
                        <Link to='/profile/orders/:id' className={styles.link}> Выход</Link>
                    </li>
                </ul>
                <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
            </div>

            <div className={`${styles.content} ${styles.contentHeight}`}>
                <HistoryItems />
            </div>
        </div>
    );
}

const HistoryItems = () => {
    const { userOrders } = useAppSelector(store => (store.wsReducer));
    const { orders } = useAppSelector(store => (store.wsReducer));
    const location = useLocation();

    return (
        <div className={`${styles.w100} ${styles.scrollable} mt-15`}>
            {/* {userOrders.map((order) => (
                <OrderFeedItem
                    key={uuidv4()}
                    order={order}
                    showStatus={true}
                    parentURL={location}
                />
            ))} */}
        </div>
    )
}
import React, { FC, useEffect, useState } from 'react';
import styles from './OrderFeedItem.module.css';
import { FeedItemProps, Ingredient, TWSOrder } from '../../services/types'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import FeedItemDetails from '../OrderFeedItemDetails/OrderFeedItemDetails';
import { addViewedOrder, clearViewedOrder } from '../../services/actions/viewedFeedOrder';

const OrderFeedItem: FC<FeedItemProps> = ({ order, showStatus, parentURL, state, /* setIsModalOpen */ }) => {
    const { ingredients } = useAppSelector((state: any) => state.ingredients);
    const [data, setData] = useState<Ingredient[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = parentURL.pathname;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (order && order.ingredients) {
            const items: Ingredient[] = order.ingredients.map(
                (item) =>
                    ingredients.find((newIngredient: any) =>
                        newIngredient._id === item) as Ingredient);
            setData(items);
        }
    }, [ingredients, order]);

    const closeModal = () => {
        navigate(`${baseURL}`);
        // setIsModalOpen(false);
    };

    // Если указывать useAppSelector вместо data1 то картинки не прогружаются, решить проблему не получилось.
    // const listOfIngredients = useAppSelector((store: any) => store.ingredients.ingredients);
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            hour: 'numeric', minute: 'numeric'
        };
        const date = new Date(dateString);
        const now = new Date();

        const timeDiff = now.getTime() - date.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            return `Сегодня, ${date.toLocaleTimeString('ru-RU', options)}`;
        } else if (daysDiff === 1) {
            return `Вчера, ${date.toLocaleTimeString('ru-RU', options)}`;
        } else if (daysDiff >= 2 && daysDiff <= 4) {
            return `${daysDiff} дня назад, ${date.toLocaleTimeString('ru-RU', options)}`;
        } else {
            return `${daysDiff} дней назад, ${date.toLocaleTimeString('ru-RU', options)}`;
        }
    };
    // можно попробовать useMemo
    const calculateOrderPrice = (orderIngredients: string[]) => {
        let totalPrice = 0;

        orderIngredients.forEach((ingredientId) => {
            const ingredient = ingredients.find((ing: any) => ing._id === ingredientId);
            if (ingredient) {
                totalPrice += ingredient.price;
            }
        });

        return totalPrice;
    };

    const getOrderStatus = (orderStatus: string) => {
        let orderTextStatus = '';
        switch (orderStatus) {
            case 'done':
                orderTextStatus = 'Выполнен';
                break;
            case 'pending':
                orderTextStatus = 'Отменён';
                break;
            case 'created':
                orderTextStatus = 'Готовится';
                break;
            default:
                orderTextStatus = 'Новый статус?';
                break;
        }
        return orderTextStatus;
    }

    const handleFeedClick = (order: TWSOrder) => {
        if (location.pathname.indexOf("feed") === -1) {
            navigate(`/profile/orders/${order._id}`);
        } else {
            navigate(`/feed/${order._id}`);
        }
        // dispatch(clearViewedOrder());
        // dispatch(addViewedOrder(order));

        // setIsModalOpen(true);
        // setSelectedIngredient(ingredient);
        // setIsModalOpen(true);
    };

    return (
        // <Link
        //     to={`/feed/${order._id}`}
        //     state={{ background: location }}
        //     key={order._id}
        //     className={`${styles.cardItem} mb-5 mr-6`}
        //     // className={`${styles.orderCard} ${styles.Link}`}
        //     // ref={dragTarget}
        //     onClick={() => handleFeedClick(order)}
        // >
        <>
            <div
                key={order._id}
                className={`${styles.orderCard} ${styles.Link}`}
                onClick={() => handleFeedClick(order)}
            >
                <div className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.cardItem} mb-6`}>
                    <p className='text text_type_digits-default'>#{order.number}</p>
                    <p className='text text_type_main-default text_color_inactive'>{formatDate(order.createdAt)}</p>
                </div>

                <div className={`${styles.flex} ${styles.cardItem} ${showStatus ? 'mb-2' : 'mb-6'}`}>
                    <p className='text text_type_main-medium mb-2'>{order.name}</p>
                </div>

                {showStatus &&
                    <div className={`${styles.flex} ${styles.cardItem} mb-6`}>
                        {getOrderStatus(order.status) === 'Выполнен'
                            ? <p className={`text text_type_main-default ${styles.orderTitleDone}`}>{getOrderStatus(order.status)}</p>
                            : getOrderStatus(order.status) === 'Отменён'
                                ? <p className={`text text_type_main-default ${styles.orderTitleCancled}`}>{getOrderStatus(order.status)}</p>
                                : <p className='text text_type_main-default'>{getOrderStatus(order.status)}</p>
                        }
                    </div>
                }

                <div className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.cardItem}`}>
                    <ul className={styles.ingredientList}>
                        {data?.slice(0, 6).map((item, index) => (
                            <li key={index} className={`${styles.orderItem}`}>
                                <img
                                    className={styles.image}
                                    src={item?.image}
                                    alt={item?.name}
                                />
                                {index === 5 && order.ingredients.length > 6 && (
                                    <div className={`${styles.remainingIngredients}`}>
                                        <p className='text text_type_digits-default'>+{order.ingredients.length - 6}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter}`}>
                        <p className='text text_type_digits-default mr-2'>{calculateOrderPrice(order.ingredients)}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>


            </div>
            {/* {setIsModalOpen && (
                <Modal onClose={closeModal} header={`#${order.number}`}>
                    <FeedItemDetails />
                </Modal>
            )} */}
            {/* </Link> */}
        </>
    )
}

export default OrderFeedItem;
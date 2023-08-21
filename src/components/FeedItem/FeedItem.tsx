import React, { FC, useMemo, useState } from 'react';
import styles from './FeedItem.module.css';
import { FeedItemProps } from '../../services/types'
import data1 from '../../utils/data.json';
import { useAppSelector } from '../../services/hooks/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import FeedItemDetails from '../FeedItemDetails/FeedItemDetails';

const FeedItem: FC<FeedItemProps> = ({ order, showStatus, parentURL }) => {
    const baseURL = parentURL.pathname;
    const navigate = useNavigate();

    const id = useParams<{ id: string }>();
    // const { id } = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const closeModal = () => {
        // navigate(-1);
        // navigate(`${baseURL}/${order.number}`);
        navigate(`${baseURL}`);
        setIsModalOpen(false);
    };

    const handleIngredientClick = (order: { number: number }) => {
        console.log('isModalOpen, id', { isModalOpen, id })
        if (id) {
            setIsModalOpen(true);
        } else {
            navigate(`${baseURL}/${order.number}`);
        }
    };

    // Если указывать useAppSelector вместо data1 то картинки не прогружаются, решить проблему не получилось.
    // const listOfIngredients = useAppSelector((store: any) => store.ingredients.ingredients);
    const { ingredients } = useAppSelector((state: any) => state.ingredients);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
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

    const getIngredientImage = useMemo(() => {
        return (ingredientId: string) => {
            const ingredient = data1.find((ing: any) => ing._id === ingredientId);

            if (!ingredient) {
                console.log(`Ingredient with ID ${ingredientId} not found.`);
                return '';
            }

            return ingredient.image;
        };
    }, [ingredients]);

    // можно попробовать useMemo
    const calculateOrderPrice = (orderIngredients: string[]) => {
        let totalPrice = 0;

        orderIngredients.forEach((ingredientId) => {
            const ingredient = data1.find((ing: any) => ing._id === ingredientId);
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

    return (
        <div
            key={order._id}
            className={`${styles.orderCard} ${styles.Link}`}
            // setIsModalOpen={setIsModalOpen}
            onClick={() => handleIngredientClick(order)}
        >
            {/* <NavLink
                to={{
                    pathname: `${baseURL}/${order.number}`
                }}

                className={styles.link}
            > */}
            <div className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.cardItem} mb-6`}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <p className='text text_type_main-default text_color_inactive'>{formatDate(order.createdAt)}</p>
            </div>

            <div className={`${styles.flex} ${styles.cardItem} ${showStatus ? 'mb-2' : 'mb-6'}`}>
                <p className='text text_type_main-medium mb-2'>Откда брать название бургера?</p>
            </div>

            {showStatus &&
                <div className={`${styles.flex} ${styles.cardItem} mb-6`}>
                    {getOrderStatus(order.status) === 'Выполнен'
                        ? <p className={`text text_type_main-default ${styles.orderTitleDone}`}>{getOrderStatus(order.status)}</p>
                        : <p className='text text_type_main-default'>{getOrderStatus(order.status)}</p>
                    }
                </div>
            }

            <div className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.cardItem}`}>
                <ul className={styles.ingredientList}>
                    {order.ingredients.slice(0, 6).map((ingredientId, index) => (
                        <li key={uuidv4()} className={`${styles.orderItem}`}>
                            <img src={getIngredientImage(ingredientId)} alt="" />
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


            {/* </NavLink> */}
            {isModalOpen && (
                <Modal onClose={closeModal} header={`#${order.number}`}>
                    {/* <Modal onClose={closeModal} header={`#${order.number}`}> */}
                    <FeedItemDetails />
                </Modal>
            )}
        </div>
    )
}

export default FeedItem;
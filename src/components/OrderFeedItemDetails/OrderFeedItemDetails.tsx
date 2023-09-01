import styles from "./OrderFeedItemDetails.module.css"
import { useParams } from "react-router";
import { useAppSelector } from '../../services/hooks/hooks';
import { IIngredient } from '../../services/types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const FeedItemDetails = () => {
    const { id } = useParams();
    const location = useLocation()
    const { ingredients } = useAppSelector((store: any) => store.ingredients);

    const { orders, userOrders } = useAppSelector((store: any) => ({
        orders: store.wsReducer.orders,
        userOrders: store.wsReducer.userOrders,
    }));

    const selectedOrders = location.pathname.includes("/profile") ? userOrders : orders;

    const order = selectedOrders && selectedOrders.find((elem: any) => elem._id === id);
    const [orderIngredients, setOrderIngredients] = useState<IIngredient[]>([])
    order?.ingredients.forEach((orderIngredient: IIngredient) => {
        const foundIngredient = ingredients.find(
            (ingredient: any) => ingredient._id === orderIngredient
        );

        if (foundIngredient) {
            orderIngredients.push(foundIngredient);
        }
    });

    const orderTotalCost = (ingredients: IIngredient[]) =>
        ingredients.reduce((accum, current) => accum + current.price, 0);

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

    return (
        <section className={`${styles.container}`}>
            <div className={`${styles.wrapper} ${styles.flex} ${styles.flexColumn}`}>
                <h2 className={`text text_type_digits-default ${styles.mAuto}`}>#{order?.number}</h2>
                <p className={`text text_type_main-medium mt-10 mb-3`}>{order?.name}</p>
                <p className={`text text_type_main-default mb-15 ${styles.orderTitleDone}`}>{order?.status === "done" ? "Выполнен" : "В работе"}</p>
                <p className={`text text_type_main-medium mb-3`}>Состав:</p>

                <ul className={`${styles.scrollable} ${styles.w100} ${styles.ingredientList} mb-10`}>
                    {orderIngredients.map((item, index) => (
                        <li key={uuidv4()} className='mb-4'>
                            <div className={`${styles.itemImage}`}>
                                <img src={item?.image} alt={`${item?.name} изображение`} />
                            </div>

                            <div className={`${styles.itemName}`}>
                                <p className='text text_type_main-default'>{item.name}</p>
                            </div>

                            <div className={`${styles.itemPrice}`}>
                                <p className='mr-2 text text_type_digits-default'>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>

                        </li>
                    ))}
                </ul>

                <ul className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.w100}`}>
                    <li className='text text_type_main-default text_color_inactive'>{formatDate(order?.createdAt)}</li>
                    <li className={`${styles.flex} ${styles.flexAlignCenter}`}>
                        <p className='text text_type_digits-default mr-2'>{orderTotalCost(orderIngredients)}</p>
                        <CurrencyIcon type="primary" />
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default FeedItemDetails;
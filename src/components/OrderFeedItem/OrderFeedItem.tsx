import React, {Dispatch, FC, SetStateAction, useEffect, useState,} from "react";
import {Link, Location, useLocation} from "react-router-dom";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./OrderFeedItem.module.css";
import {IIngredient, RootState, TWSOrder} from "../../services/types/types";
import {useAppDispatch, useAppSelector, useFormattedDate} from "../../services/hooks/hooks";
import {addViewedOrder, clearViewedOrder,} from "../../services/actions/viewedFeedOrder";

interface Props {
    order:TWSOrder;
    showStatus:boolean;
    parentURL:Location;
    state?:{ background:Location };
    setIsModalOpen:Dispatch<SetStateAction<boolean>>|boolean|undefined;
}

const OrderFeedItem:FC<Props> = ({ order, showStatus }) => {
    const { ingredients } = useAppSelector(
        (state:RootState) => state.ingredients
    );

    const [data, setData] = useState<IIngredient[]>([]);

    const location = useLocation();

    const dispatch = useAppDispatch();

    const [, setSelectedOrder] = useState<TWSOrder|null>(null);

    useEffect(() => {
        if (order && order.ingredients) {
            const items:IIngredient[] = order.ingredients.map(
                (item) =>
                    ingredients.find(
                        (newIngredient:{ _id:string }) => newIngredient._id === item
                    ) as IIngredient
            );

            setData(items);
        }
    }, [ingredients, order]);

    const formattedDate:string = useFormattedDate(order?.createdAt);

    const calculateOrderPrice = (orderIngredients:string[]) => {
        let totalPrice = 0;

        orderIngredients.forEach((ingredientId) => {
            const ingredient = ingredients.find(
                (ing:{ _id:string }) => ing._id === ingredientId
            );

            if (ingredient) {
                totalPrice += ingredient.price;
            }
        });

        return totalPrice;
    };

    const getOrderStatus = (orderStatus:string) => {
        let orderTextStatus = "";

        switch (orderStatus) {
            case "done":
                orderTextStatus = "Выполнен";
                break;
            case "pending":
                orderTextStatus = "Отменён";
                break;
            case "created":
                orderTextStatus = "Готовится";
                break;
            default:
                orderTextStatus = "Новый статус?";
                break;
        }

        return orderTextStatus;
    };

    const handleClick = () => {
        dispatch(clearViewedOrder());

        dispatch(addViewedOrder(order));

        setSelectedOrder(order);
    };

    return (
        <Link
            to={`${order.number}`}
            state={{ background: location }}
            key={order._id}
            className={`${styles.link} mb-5 mr-6`}
            onClick={handleClick}
        >
            <div className={`${styles.orderCard} ${styles.Link}`}>
                <div
                    className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.cardItem} mb-6`}>
                    <p className="text text_type_digits-default">#{order.number}</p>

                    <p className="text text_type_main-default text_color_inactive">
                        {formattedDate}
                    </p>
                </div>

                <div className={`${styles.flex} ${styles.cardItem} ${showStatus ? "mb-2" : "mb-6"}`}>
                    <p className="text text_type_main-medium mb-2">{order.name}</p>
                </div>

                {showStatus && (
                    <div className={`${styles.flex} ${styles.cardItem} mb-6`}>
                        {getOrderStatus(order.status) === "Выполнен" ? (
                            <p
                                className={`text text_type_main-default ${styles.orderTitleDone}`}
                            >
                                {getOrderStatus(order.status)}
                            </p>
                        ) : getOrderStatus(order.status) === "Отменён" ? (
                            <p
                                className={`text text_type_main-default ${styles.orderTitleCancled}`}
                            >
                                {getOrderStatus(order.status)}
                            </p>
                        ) : (
                            <p className="text text_type_main-default">
                                {getOrderStatus(order.status)}
                            </p>
                        )}
                    </div>
                )}

                <div
                    className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.cardItem}`}>
                    <ul className={styles.ingredientList}>
                        {data?.slice(0, 6).map((item, index:number) => (
                            <li key={index} className={`${styles.orderItem}`}>
                                <img
                                    className={styles.image}
                                    src={item?.image}
                                    alt={item?.name}
                                />
                                {index === 5 && order.ingredients.length > 6 && (
                                    <div className={`${styles.remainingIngredients}`}>
                                        <p className="text text_type_digits-default">
                                            +{order.ingredients.length - 6}
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter}`}>
                        <p className="text text_type_digits-default mr-2">
                            {calculateOrderPrice(order.ingredients)}
                        </p>

                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OrderFeedItem;

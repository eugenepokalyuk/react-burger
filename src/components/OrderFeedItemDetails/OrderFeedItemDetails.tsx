import styles from "./OrderFeedItemDetails.module.css";
import { useParams } from "react-router";
import { useAppSelector, useFormattedDate } from "../../services/hooks/hooks";
import { IIngredient, RootState, TWSOrder } from "../../services/types/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { FC, useEffect, useState } from "react";
import { fetchOrderData } from "../../utils/api";
import { NavLink } from "react-router-dom";

type Props = {
  isModal?: boolean
}

const OrderFeedItemDetails: FC<Props> = ({ isModal }) => {
  const { number } = useParams<{ number: string }>();
  const { ingredients } = useAppSelector((store: RootState) => store.ingredients);
  const [orderData, setOrderData] = useState<TWSOrder | null>(null);
  useEffect(() => {
    const getOrderData = async () => {
      try {
        const data = await fetchOrderData(number);
        setOrderData(data);
      } catch (error) {
        // Обработка ошибки
      }
    };

    getOrderData();
  }, [number]);

  const formattedDate: string = useFormattedDate(orderData?.createdAt);

  const orderIngredients = orderData?.ingredients
    .map((orderIngredient) =>
      ingredients.find(
        (ingredient: { _id: string }) => ingredient._id === orderIngredient
      )
    )
    .filter(Boolean) as IIngredient[];

  const orderTotalCost = (ingredients: IIngredient[]) =>
    ingredients.reduce((accum, current) => accum + current.price, 0);

  const toggleTitleNumber = !isModal ? styles.textAlignLeft : styles.mAuto;

  return (
    <>
      <section className={`${styles.container} ${!isModal && styles.positionFixed}`}>
        {orderData ? (
          <div className={`${styles.wrapper} ${styles.flex} ${styles.flexColumn}`}>
            <h1 className="text text_type_main-large mb-10">Детали заказа</h1>
            <h2 className={`${toggleTitleNumber} text text_type_digits-default`}>#{orderData?.number}</h2>
            <p className={`text text_type_main-medium mt-10 mb-3`}>
              {orderData?.name}
            </p>
            <p className={`text text_type_main-default mb-15 ${styles.orderTitleDone}`}>
              {orderData?.status === "done" ? "Выполнен" : "В работе"}
            </p>
            <p className={`text text_type_main-medium mb-3`}>Состав:</p>

            <ul className={`${styles.scrollable} ${styles.w100} ${styles.ingredientList} mb-10`}>
              {Object.entries(
                orderIngredients.reduce((ingredientCount, item) => {
                  if (!ingredientCount[item._id]) {
                    ingredientCount[item._id] = 0;
                  }
                  ingredientCount[item._id] += 1;

                  return ingredientCount;
                }, {} as { [key: string]: number })
              ).map(([itemId, itemCount]) => (
                <li key={uuidv4()} className="mb-4">
                  <div className={`${styles.itemImage}`}>
                    <img
                      src={
                        orderIngredients.find((item) => item._id === itemId)
                          ?.image
                      }
                      alt={`${orderIngredients.find((item) => item._id === itemId)
                        ?.name
                        } изображение`}
                    />
                  </div>

                  <div className={`${styles.itemName}`}>
                    <p className="text text_type_main-default">
                      {
                        orderIngredients.find((item) => item._id === itemId)
                          ?.name
                      }
                    </p>
                  </div>

                  <div className={`${styles.itemPrice}`}>
                    <p className="mr-2 text text_type_digits-default">
                      {itemCount} x{" "}
                      {
                        orderIngredients.find((item) => item._id === itemId)
                          ?.price
                      }
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              ))}
            </ul>

            <ul className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.w100}`}>
              <li className="text text_type_main-default text_color_inactive">
                {formattedDate}
              </li>
              <li className={`${styles.flex} ${styles.flexAlignCenter}`}>
                <p className="text text_type_digits-default mr-2">
                  {orderTotalCost(orderIngredients)}
                </p>
                <CurrencyIcon type="primary" />
              </li>
            </ul>
          </div>
        ) : (
          <div className={`${styles.wrapper} ${styles.flex} ${styles.flexColumn}`}>
            <h2 className={`${toggleTitleNumber} text text_type_main-large`}>Ошибка!</h2>
            <p className={`text text_type_main-medium mt-10 mb-3`}>
              Данного заказа не существует
            </p>
            <p className={`text text_type_main-medium mb-3`}>
              Можете перейти на <NavLink to="/" className={`${styles.orderTitleDone}`}>главную страницу</NavLink>
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default OrderFeedItemDetails;
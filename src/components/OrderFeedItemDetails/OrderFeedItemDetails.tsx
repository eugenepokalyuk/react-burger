import styles from "./OrderFeedItemDetails.module.css";
import { useParams } from "react-router";
import { useAppSelector } from "../../services/hooks/hooks";
import { IIngredient, RootState, TWSOrder } from "../../services/types/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { fetchOrderData } from "../../utils/api";

const FeedItemDetails = () => {
  const { number } = useParams<{ number: string }>();
  const { ingredients } = useAppSelector(
    (store: RootState) => store.ingredients
  );
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

  const orderIngredients = orderData?.ingredients
    .map((orderIngredient) =>
      ingredients.find(
        (ingredient: { _id: string }) => ingredient._id === orderIngredient
      )
    )
    .filter(Boolean) as IIngredient[];

  const orderTotalCost = (ingredients: IIngredient[]) =>
    ingredients.reduce((accum, current) => accum + current.price, 0);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(dateString);
    const now = new Date();

    const timeDiff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return `Сегодня, ${date.toLocaleTimeString("ru-RU", options)}`;
    } else if (daysDiff === 1) {
      return `Вчера, ${date.toLocaleTimeString("ru-RU", options)}`;
    } else if (daysDiff >= 2 && daysDiff <= 4) {
      return `${daysDiff} дня назад, ${date.toLocaleTimeString(
        "ru-RU",
        options
      )}`;
    } else {
      return `${daysDiff} дней назад, ${date.toLocaleTimeString(
        "ru-RU",
        options
      )}`;
    }
  };

  return (
    <>
      {orderData && (
        <section className={`${styles.container}`}>
          <div
            className={`${styles.wrapper} ${styles.flex} ${styles.flexColumn}`}
          >
            <h2 className={`text text_type_digits-default ${styles.mAuto}`}>
              #{orderData?.number}
            </h2>
            <p className={`text text_type_main-medium mt-10 mb-3`}>
              {orderData?.name}
            </p>
            <p
              className={`text text_type_main-default mb-15 ${styles.orderTitleDone}`}
            >
              {orderData?.status === "done" ? "Выполнен" : "В работе"}
            </p>
            <p className={`text text_type_main-medium mb-3`}>Состав:</p>

            <ul
              className={`${styles.scrollable} ${styles.w100} ${styles.ingredientList} mb-10`}
            >
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
                      alt={`${
                        orderIngredients.find((item) => item._id === itemId)
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

            <ul
              className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.w100}`}
            >
              <li className="text text_type_main-default text_color_inactive">
                {formatDate(orderData?.createdAt)}
              </li>
              <li className={`${styles.flex} ${styles.flexAlignCenter}`}>
                <p className="text text_type_digits-default mr-2">
                  {orderTotalCost(orderIngredients)}
                </p>
                <CurrencyIcon type="primary" />
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default FeedItemDetails;
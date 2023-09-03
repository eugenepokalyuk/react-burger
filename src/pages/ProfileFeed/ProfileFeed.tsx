import React, { FC, useEffect } from "react";
import styles from "./ProfileFeed.module.css";
import { Link, useLocation, NavLink } from "react-router-dom";
import OrderFeedItem from "../../components/OrderFeedItem/OrderFeedItem";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/WSActions";

export const ProfileFeed: FC = () => {
  const location = useLocation();
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} mr-15`}>
        <ul
          className={`mb-20 text text_type_main-medium text_color_inactive ${styles.listLinks}`}
        >
          <NavLink
            to="/profile"
            className={
              location.pathname === "/profile"
                ? styles.activeNavLink
                : `${styles.link} text_color_inactive`
            }
          >
            <li className="mb-4">Профиль</li>
          </NavLink>

          <NavLink
            to="/profile/orders"
            className={
              location.pathname === "/profile/orders"
                ? styles.activeNavLink
                : `${styles.link} text_color_inactive`
            }
          >
            <li className="mb-4">История заказов</li>
          </NavLink>

          <li className="mb-4">
            <Link to="/profile/orders/:id" className={styles.link}>
              {" "}
              Выход
            </Link>
          </li>
        </ul>
        <p className="text text_type_main-small text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <ProfileItems />
    </div>
  );
};

const ProfileItems = () => {
  const dispatch = useAppDispatch();
  const { userOrders } = useAppSelector((store) => store.wsReducer);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const cleanedToken = token?.replace("Bearer ", "");
    dispatch({
      type: WS_AUTH_CONNECTION_START,
      payload: `?token=${cleanedToken}`,
    });
  }, [dispatch]);

  return (
    <div className={`${styles.content} ${styles.contentHeight}`}>
      <div className={`${styles.w100} ${styles.scrollable} mt-15`}>
        {userOrders.map((order) => (
          <OrderFeedItem
            key={uuidv4()}
            order={order}
            showStatus={true}
            parentURL={location}
            state={undefined}
            setIsModalOpen={undefined}
          />
        ))}
      </div>
    </div>
  );
};
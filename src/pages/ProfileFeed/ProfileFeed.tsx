import React, { FC } from "react";
import styles from "./ProfileFeed.module.css";
import { Link, useLocation, NavLink } from "react-router-dom";
import { ProfileItems } from "../../components/ProfileItems/ProfileItems";

const clx = (classes: (string | { [key: string]: boolean })[]): string => {
  const classList = classes.flatMap((item) => {
    if (typeof item === "string") {
      return item;
    }
    return Object.entries(item)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);
  });

  return classList.join(" ");
}

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
            className={clx([
              styles.link,
              "text_color_inactive",
              {
                [styles.navlink]: true,
                [styles.active]: location.pathname === "/profile"
              }
            ])}
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
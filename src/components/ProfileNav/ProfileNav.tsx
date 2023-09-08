import { FC, MouseEvent, useState } from "react";
import styles from "./ProfileNav.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { RootState } from "../../services/types/types";
import { clearUser } from "../../services/actions/authActions";

export const ProfileNav: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [, setError] = useState<string>("");

    const getUserRefreshToken = useAppSelector(
        (store: RootState) => store.auth.user?.refreshToken
    );

    const clx = (classes: (string | { [key: string]: boolean })[]): string => {
        const classList = classes.flatMap((item) => {
            if (typeof item === "string") {
                return item;
            }
            const getClassArray = Object.length > 0 && Object.entries(item)
                .filter(([_, value]) => value)
                .map(([key, _]) => key);
            return getClassArray;
        });
        return classList.join(" ");
    }

    const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        let refreshToken = getUserRefreshToken
            ? getUserRefreshToken
            : localStorage.getItem("refreshToken");

        dispatch(clearUser());
        localStorage.clear();
        logoutUser(refreshToken || "")
            .then((res) => {
                navigate("/login", { replace: true });
            })
            .catch((error) => {
                setError("Ой, произошла ошибка!");
            });
    };

    return (
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

                <NavLink to="/login" className={styles.link} onClick={handleLogout}>
                    <li className="mb-4">
                        Выход
                    </li>
                </NavLink>
            </ul>

            <p className="text text_type_main-small text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </div>
    );
}
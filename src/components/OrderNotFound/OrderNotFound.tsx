import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";
import styles from "./OrderNotFound.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectUserCredentials } from "../../services/reducers/authReducer";

export const OrderNotFound = () => {
    const { user: AuthUser } = useAppSelector(selectUserCredentials);
    const navigate = useNavigate();

    const handleAuthClick = async () => {
        navigate("/login", { replace: true });
    };

    const handleOrderClick = async () => {
        navigate("/", { replace: true });
    };

    return (
        <div>
            <div className={`${styles.orderFeedEmptyItem} mb-8`}>
                <h2 className='mb-4'>Заказов нет!</h2>
                <p className='text text_type_main-default'>Но вы всегда можете создать новый!</p>
            </div>
            <div className={`${styles.orderFeedEmptyButton}`}>
                {AuthUser ? (
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={handleOrderClick}
                    >
                        Собрать бургер
                    </Button>
                ) : (
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={handleAuthClick}
                        disabled={false}
                    >
                        Авторизация
                    </Button>
                )}
            </div>
        </div>
    )
};
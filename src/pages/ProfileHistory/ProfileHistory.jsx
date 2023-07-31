import { useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfileHistory.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';

export function ProfileHistory() {
    // const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [change, setChange] = useState(false);

    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container}`}>
                <ul className={`mb-20 text text_type_main-medium text_color_inactive ${styles.listLinks}`}>
                    <li className='mb-4'>
                        <NavLink to='/profile' className={location.pathname === '/profile' ? styles.activeNavLink : `${styles.link} text_color_inactive`} >
                            Профиль
                        </NavLink>
                    </li>
                    <li className='mb-4'>
                        <NavLink to='/profile/orders' className={location.pathname === '/profile/orders' ? styles.activeNavLink : `${styles.link} text_color_inactive`} >
                            История заказов
                        </NavLink>
                    </li>
                    <li className='mb-4'>
                        <Link to='/profile/orders/:id' className={styles.link}> Выход</Link>
                    </li>
                </ul>
                <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
            </div>

            <div className={`${styles.content} ${styles.contentHeight}`}>
                <HistoryItems />
            </div>
        </div>
    );
}

const HistoryItems = () => {
    return (
        <ul className='mt-10'>
            <li className={`${styles.historyItem} p-6`}>
                <div>
                    <p className="text text_type_digits-default">#034535</p>
                    <p className="text text_type_main-default">Сегодня, 16:20</p>
                </div>
                <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                <p className="text text_type_main-default">Создан</p>
            </li>

            <li className={`${styles.historyItem} p-6 mt-6`}>
                <div>
                    <p className="text text_type_digits-default">#034535</p>
                    <p className="text text_type_main-default">Сегодня, 16:20</p>
                </div>
                <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                <p className="text text_type_main-default">Создан</p>
            </li>

            <li className={`${styles.historyItem} p-6 mt-6`}>
                <div>
                    <p className="text text_type_digits-default">#034535</p>
                    <p className="text text_type_main-default">Сегодня, 16:20</p>
                </div>
                <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                <p className="text text_type_main-default">Создан</p>
            </li>
        </ul>
    )
}
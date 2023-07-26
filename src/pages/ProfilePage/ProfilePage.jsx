import { useState, useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfilePage.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { logoutUser, updateUser } from '../../utils/api';
import { EDIT_FAILURE, EDIT_SUCCESS } from '../../services/actions/authActions';

export function ProfilePage() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [change, setChange] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const getUserAccessToken = useSelector((store) => store.auth.user.accessToken);
    const getUserRefreshToken = useSelector((store) => store.auth.user.refreshToken);
    const getUserEmail = useSelector((store) => store.auth.user.email);
    const getUserName = useSelector((store) => store.auth.user.name);
    const getUserPassword = useSelector((store) => store.auth.user.password);

    const [error, setError] = useState('');

    useEffect(() => {
        setName(getUserName);
        setEmail(getUserEmail);
        setPassword(getUserPassword);
    }, []);

    const handleReset = () => {
        setName(getUserName);
        setEmail(getUserEmail);
        setPassword(getUserPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(name, email, password, getUserAccessToken)
            .then(res => {
                dispatch({ type: EDIT_SUCCESS })
                console.log('res', res)
            })
            .catch(error => {
                dispatch({ type: EDIT_FAILURE, payload: error.message })
                setError('Ой, произошла ошибка!');
            });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser(email, password)
            .then(res => {
                dispatch({ type: 'LOGOUT_SUCCESS' });
                navigate('/login', { replace: true });
            })
            .catch(error => {
                dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
                setError('Ой, произошла ошибка!');
            });
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
                        <NavLink to='/login' className={styles.link} onClick={handleLogout}>
                            Выход
                        </NavLink>
                    </li>
                </ul>
                <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
            </div>

            <div>
                <form onSubmit={handleSubmit} className={`${styles.content} ${styles.contentHeight}`}>
                    {/* onClick={() => handleSubmit()}  */}
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => { setChange(true); setName(e.target.value) }}
                        icon={'EditIcon'}
                        name={'name'}
                        value={name}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={e => { setChange(true); setEmail(e.target.value) }}
                        icon={'EditIcon'}
                        name={'login'}
                        value={email}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => { setChange(true); setPassword(e.target.value) }}
                        icon={'EditIcon'}
                        name={'password'}
                        value={password}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

                    {change &&
                        <div className={`${styles.text_align_buttons}`}>
                            <Button onClick={() => handleReset()} htmlType="reset" type="secondary" size="medium" extraClass='mr-5'>
                                Отмена
                            </Button>

                            <Button htmlType="submit" type="primary" size="medium">
                                Сохранить
                            </Button>
                        </div>}
                </form>
            </div>
        </div>
    );
}
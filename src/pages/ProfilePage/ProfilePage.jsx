import { useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfilePage.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';

export function ProfilePage() {
    // const dispatch = useDispatch();

    const [newName, setName] = useState();
    const [newEmail, setEmail] = useState();
    const [newPassword, setPassword] = useState();
    const [change, setChange] = useState(false);

    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        //   editUser()
        //     .then(res => {
        //         console.log('ProfilePage', res)
        //     })
    }

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container}`}>
                <ul className={`mb-20 text text_type_main-medium text_color_inactive ${styles.listLinks}`}>
                    <li className='mb-4'>
                        <NavLink
                            to='/profile'
                            className={styles.link}
                        // activeClassName={styles.activeNavLink}
                        // Ругается React does not recognize the `activeClassName` prop on a DOM element.
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li className='mb-4'>
                        <NavLink
                            to='/profile/orders'
                            className={styles.link}
                        // activeClassName={styles.activeNavLink}
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li className='mb-4'>
                        <Link to='/profile/orders/:id' className={styles.link}> Выход</Link>
                    </li>
                </ul>
                <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
            </div>

            <div>
                <form onSubmit={handleSubmit} className={`${styles.content} ${styles.contentHeight}`}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => { setChange(true); setName(e.target.value) }}
                        icon={'EditIcon'}
                        name={'name'}
                        value={newName}
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
                        value={newEmail}
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
                        value={newPassword}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />
                    {change &&
                        <div className={`${styles.text_align_buttons}`}>
                            <Button htmlType="reset" type="secondary" size="medium" extraClass='mr-5'>
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
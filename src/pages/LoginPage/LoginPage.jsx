import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, ShowIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import { loginUser } from '../../utils/api';
import { USER_STATEMENT } from '../../services/actions/authActions'
export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(email, password)
            .then(res => {
                dispatch({ type: 'REGISTER_SUCCESS', payload: res.user });
                dispatch({
                    type: USER_STATEMENT,
                    payload: {
                        accessToken: res.accessToken,
                        refreshToken: res.refreshToken,
                        email: res.user.email,
                        name: res.user.name,
                        password
                    }
                })
                navigate('/', { replace: true });
            })
            .catch(error => {
                dispatch({ type: 'REGISTER_FAILURE' });
                setError('Ой, произошла ошибка!');
            });
    };

    return (


        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <h1 className='text text_type_main-medium mb-6 mt-10'>Вход</h1>

                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={e => setEmail(e.target.value)}
                        name={'email'}
                        value={email}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => setPassword(e.target.value)}
                        icon={'ShowIcon'}
                        name={'password'}
                        value={password}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

                    {error && (
                        <p
                            className={`${styles.errorMessage} text text_type_main-default mb-4`}
                            align="center"
                        >
                            {error}
                        </p>
                    )}

                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                        Войти
                    </Button>


                    <div className='text text_type_main-small mb-4'>
                        <span className="text_color_inactive">Вы - новый пользователь? </span>
                        <Link to='/register' className={styles.link}> Зарегистрироваться</Link>
                    </div>

                    <div className='text text_type_main-small'>
                        <span className="text_color_inactive">Забыли пароль? </span>
                        <Link to='/forgot-password' className={styles.link}> Восстановить пароль</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
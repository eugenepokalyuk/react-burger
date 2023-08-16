import React, { useState, FormEvent, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './RegisterPage.module.css';
import { registerUser, loginUser } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { USER_STATEMENT } from '../../services/actions/authActions'

export const RegisterPage: FC = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerUser(name, email, password)
            .then(res => {
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
            })
            .catch(error => {
                setError('Ой, произошла ошибка!');
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <h1 className='text text_type_main-medium mb-6 mt-10'>Регистрация</h1>

                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        name={'name'}
                        value={name}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

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
                        <p className={`${styles.errorMessage} text text_type_main-default mb-4`} >
                            {error}
                        </p>
                    )}

                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                        Зарегистрироваться
                    </Button>

                    <div className='text text_type_main-small mb-4'>
                        <span className="text_color_inactive">Уже зарегистрированы?</span>
                        <Link to='/login' className={styles.link}> Войти</Link>
                    </div>

                </form>
            </div>
        </div>

    );
}
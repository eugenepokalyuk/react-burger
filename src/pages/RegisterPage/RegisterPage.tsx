import React, {FC, FormEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './RegisterPage.module.css';
import {loginUser, registerUser} from '../../utils/api';
import {USER_STATEMENT} from '../../services/actions/authActions'
import {useAppDispatch} from '../../services/hooks/hooks';

export const RegisterPage:FC = () => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        registerUser(name, email, password)
            .then(res => {
                loginUser(email, password)
                    .then(res => {
                        // dispatch({ type: 'REGISTER_SUCCESS', payload: res.user });
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
                        // dispatch({ type: 'REGISTER_FAILURE' });
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
                        extraClass={`${styles.inputName} `}
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
                        extraClass={`${styles.inputEmail}`}
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
                        extraClass={`${styles.inputPwd}`}
                    />

                    {error && (
                        <p className={`${styles.errorMessage} text text_type_main-default mb-4`}>
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

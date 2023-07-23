import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input, ShowIcon, Button, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './RegisterPage.module.css';
import { createUser } from '../../utils/api';

export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(name, email, password)
            .then(res => {
                console.log('ResetPasswordPage res', res)
                navigate("/login")
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
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

                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                        Зарегистрироваться
                    </Button>

                    <div className='text text_type_main-small mb-4'>
                        <span className="text_color_inactive">Уже зарегистрированы?</span>
                        <Link to='/login' className={styles.link}> Войти</Link>
                    </div>

                </div>
            </div>
        </div>

    );
}
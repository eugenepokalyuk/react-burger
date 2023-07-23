import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, ShowIcon, Button, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './LoginPage.module.css';
import { signIn } from '../../utils/api';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(email, password)
            .then(res => {
                console.log('LoginPage res', res)
                //     navigate("/login")
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
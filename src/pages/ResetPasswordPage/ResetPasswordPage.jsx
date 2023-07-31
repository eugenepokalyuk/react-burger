import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPasswordPage.module.css';
import { sendPassword } from '../../utils/api';

export function ResetPasswordPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const passwordResetDone = localStorage.getItem('passwordResetDone');

        if (!passwordResetDone) {
            navigate('/forgot-password');
        }

        localStorage.removeItem('passwordResetDone');
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPassword(password, name)
            .then(res => {
                navigate('/login', { replace: true });
            })
            .catch(error => {
                setError('Ой, произошла ошибка!');
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <h1 className='text text_type_main-medium mb-6 mt-10'>Восстановление пароля</h1>

                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setPassword(e.target.value)}
                        icon={'ShowIcon'}
                        name={'password'}
                        value={password}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setName(e.target.value)}
                        name={'name'}
                        value={name}
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
                        Сохранить
                    </Button>

                    <div className='text text_type_main-small mb-4'>
                        <span className="text_color_inactive">Вспомнили пароль?</span>
                        <Link to='/login' className={styles.link}> Войти</Link>
                    </div>

                </form>
            </div>
        </div>

    );
}
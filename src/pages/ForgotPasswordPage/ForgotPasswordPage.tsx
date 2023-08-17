import React, { useState, FormEvent, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPasswordPage.module.css';
import { resetPassword } from '../../utils/api';

// Нужно ли здесь указывать FC? 
// Если да, то почему?
export const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword(email)
            .then(res => {
                localStorage.setItem('passwordResetDone', 'true');
                navigate('/reset-password', { replace: true });
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
                        type={'text'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setEmail(e.target.value)}
                        name={'email'}
                        value={email}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass='mb-6'
                    />

                    {error && (
                        <p className={`${styles.errorMessage} text text_type_main-default mb-4`}>
                            {error}
                        </p>
                    )}

                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                        Восстановить
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
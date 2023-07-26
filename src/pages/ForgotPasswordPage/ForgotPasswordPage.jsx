import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input, ShowIcon, Button, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPasswordPage.module.css';
import { resetPassword } from '../../utils/api';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     resetPassword(email)
    //         .then(res => {
    //             navigate('/reset-password', { replace: true });
    //         })
    //         .catch(error => {
    //             setError('Ой, произошла ошибка!');
    //         });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword(email)
            .then(res => {
                console.log('res', res);
                // dispatch({ type: 'REGISTER_SUCCESS', payload: res.user });
                // dispatch({
                //     type: USER_STATEMENT,
                //     payload: {
                //         accessToken: res.accessToken,
                //         refreshToken: res.refreshToken,
                //         email: res.user.email,
                //         name: res.user.name,
                //         password
                //     }
                // })
                navigate('/reset-password', { replace: true });
            })
            .catch(error => {
                // dispatch({ type: 'REGISTER_FAILURE' });
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
                        <p
                            className={`${styles.errorMessage} text text_type_main-default mb-4`}
                            align="center"
                        >
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
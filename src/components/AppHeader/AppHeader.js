import { useState, useEffect } from 'react';
import styles from './AppHeader.module.css';
import { NavLink, useMatch } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCredentials } from '../../services/reducers/authReducer'

const AppHeader = () => {
  const [userName, setUserName] = useState('');
  const user = localStorage.getItem('accessToken');
  // const { user } = useSelector(selectUserCredentials);
  const loginRoute = useMatch("/login");
  const profileRoute = useMatch("/profile");

  const link = ({ isActive }) =>
    isActive
      ? `${styles.link} text_color_primary`
      : `${styles.link}`;

  useEffect(() => {
    user && setUserName(localStorage.getItem('userName'));
  }, [])

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <nav className={styles.nav}>

        <ul className={styles.list}>

          <li>
            <NavLink to='/' className={link}>
              <BurgerIcon type={useMatch("/") ? "primary" : "secondary"} />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </NavLink>
          </li>

          <li className='ml-2'>
            <NavLink to='/feed' className={link}>
              <ListIcon type={useMatch("/feed") ? "primary" : "secondary"} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </li>

        </ul>

        <div className={styles.logo}>
          <NavLink to='/' >
            <Logo />
          </NavLink>
        </div>


        <ul className={styles.list}>
          {user
            ? <li>
              <NavLink to='/profile' className={link}>
                <ProfileIcon type={profileRoute ? "primary" : "secondary"} />
                <p className='text text_type_main-default ml-2'>Личный кабинет</p>
              </NavLink>
            </li>

            : <li>
              <NavLink to='/login' className={link}>
                <ProfileIcon type={loginRoute ? "primary" : "secondary"} />
                <p className='text text_type_main-default ml-2'>Личный кабинет</p>
              </NavLink>
            </li>}

        </ul>

      </nav>
    </header>
  );
};
export default AppHeader;
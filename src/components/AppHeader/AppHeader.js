import styles from './AppHeader.module.css';
import { NavLink, useMatch } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCredentials } from '../../services/reducers/authReducer'

const AppHeader = () => {
  const { error: AuthError, user: AuthUser } = useSelector(selectUserCredentials);
  const loginRoute = useMatch("/login");
  const profileRoute = useMatch("/profile");

  const link = ({ isActive }) =>
    isActive
      ? `${styles.link} text_color_primary`
      : `${styles.link}`;

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
          {AuthUser
            ? <li>
              <NavLink to='/profile' className={link}>
                <ProfileIcon type={profileRoute ? "primary" : "secondary"} />
                <p className='text text_type_main-default ml-2'>{AuthUser.name}</p>
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
import { useState, useEffect, FC } from 'react';
import styles from './AppHeader.module.css';
import { NavLink, useMatch } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMediaQuery } from "react-responsive";

const AppHeader: FC = () => {
  const [userName, setUserName] = useState<string>('');
  const user = localStorage.getItem('accessToken');
  const getUserNameFromLS = localStorage.getItem('userName');
  const homeRoute = useMatch("/");
  const loginRoute = useMatch("/login");
  const feedRoute = useMatch("/feed");
  const profileRoute = useMatch("/profile");

  const link = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} text_color_primary` : `${styles.link}`;

  useEffect(() => {
    if (user) {
      setUserName(localStorage.getItem('userName') || userName || '');
    }
    setUserName(getUserNameFromLS || userName || '');
  }, [getUserNameFromLS, setUserName, user, userName]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)"
  });

  const DesktopView: FC = () => {
    return (
      <nav className={styles.nav}>
        <ul className={styles.list}>

          <li>
            <NavLink to='/' className={link}>
              <BurgerIcon type={homeRoute ? "primary" : "secondary"} />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </NavLink>
          </li>

          <li className='ml-2'>
            <NavLink to='/feed' className={link}>
              <ListIcon type={feedRoute ? "primary" : "secondary"} />
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
            </li>
          }
        </ul>
      </nav>
    )
  }

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      {
        isDesktop && <DesktopView />
      }
    </header>
  );
};
export default AppHeader;
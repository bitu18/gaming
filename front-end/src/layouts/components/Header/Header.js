import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faLessThanEqual, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import config from '~/config';

import { useEffect } from 'react';
import * as userService from '~/serivces/userService';
import { useAuth } from '~/context/AuthContext';


const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback & Help',
        to: '/feedback',
    },
];

function Header() {
    const {user, logout} = useAuth();

    const navigate = useNavigate();

    const isLogin = !!user; // Replace with actual login state from your store or context

    const handleMenuChange = async (item) => {
        if (item.title === 'Log out') {
            await logout();
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Profile',
            to: `/profile/@${user?.name}`,
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Link to="/" className={cx('logo')}>
                    <img src={images.logoGaming} alt="QuestLix" />
                </Link>

                {/* Navigation */}
                <nav className={cx('navigation')}>
                    <NavLink to="/worksheets">Worksheets</NavLink>

                    <NavLink to="/teacher-tools">Teacher Tools</NavLink>

                    <NavLink to="/games">Games</NavLink>

                    {/* <NavLink to="/resource-library">Resource Library</NavLink>

                    <NavLink to="/pricing">Pricing</NavLink> */}
                </nav>

                {/* Right */}
                <div className={cx('actions')}>
                    {isLogin ? (
                        <Menu items={userMenu} onChange={handleMenuChange}>
                            <div className={cx('profile')}>
                                <img src={
                                        user.profilePic ||
                                        `https://ui-avatars.com/api/?name=${user.name}&background=0d6e59&color=fff`
                                    } alt="avatar" className={cx('avatar')} />

                                <span>{user?.name}</span>
                            </div>
                        </Menu>
                    ) : (
                        <>
                            <Button outline rounded to={config.routes.login}>
                                Log in
                            </Button>

                            <Button primary rounded to={config.routes.signup}>
                                Sign up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

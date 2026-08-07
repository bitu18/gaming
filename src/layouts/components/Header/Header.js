import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import config from '~/config';

import { useEffect } from 'react';
import { actions, useStore } from '~/store';
import { LOGOUT_SUCCESS } from '~/store/constants';

import * as userService from '~/serivces/userService';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback & Help',
        to: '/feedback',
    },
];

function Header() {
    const [state, dispatch] = useStore();
    const { isLogin } = state;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userService.getInforUser();
                dispatch(actions.loginSuccess(res.data));
            } catch {}
        };

        fetchUser();
    }, [dispatch]);

    const handleMenuChange = async (item) => {
        if (item.title === 'Log out') {
            const res = await userService.userLogout();

            if (res.code === 0) {
                dispatch({ type: LOGOUT_SUCCESS });
                navigate('/login');
            }
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Profile',
            to: `/profile/@${state.user?.userName}`,
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

                    <NavLink to="/resource-library">Resource Library</NavLink>

                    <NavLink to="/pricing">Pricing</NavLink>
                </nav>

                {/* Right */}
                <div className={cx('actions')}>
                    {isLogin ? (
                        <Menu items={userMenu} onChange={handleMenuChange}>
                            <div className={cx('profile')}>
                                <img src="https://i.pravatar.cc/150" alt="" />

                                <span>{state.user?.userName}</span>
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

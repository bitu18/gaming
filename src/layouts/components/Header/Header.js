import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faEllipsisVertical, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
// import Image from '~/component/Image';
import config from '~/config';
import { actions, useStore } from '~/store';
import { useEffect } from 'react';
import * as userService from '~/serivces/userService';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '~/store/constants';

const cx = classNames.bind(styles);

// const currentUser = false;

const MENU_ITEMS = [
    // {
    //     icon: <FontAwesomeIcon icon={faLanguage} />,
    //     title: 'English',
    //     children: {
    //         title: 'Language',
    //         data: [
    //             {
    //                 type: 'language',
    //                 code: 'en',
    //                 title: 'English',
    //             },
    //             {
    //                 type: 'language',
    //                 code: 'vi',
    //                 title: 'Tiếng Việt',
    //             },
    //         ],
    //     },
    // },

    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
];

function Header() {
    const [state, dispatch] = useStore();
    const { isLogin } = state;
    const navigate = useNavigate();

    const handleMenuChange = async (menuItem) => {
        if (menuItem.title === 'Log out') {
            const result = await userService.userLogout();

            if (result.code === 0) {
                dispatch({ type: LOGOUT_SUCCESS });
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await userService.getInforUser();
                dispatch(actions.loginSuccess(userData.data));
            } catch (error) {
                const status = error.response?.status;
                if (status !== 400 && status !== 401) {
                    console.error('Unexpected error while fetching user info:', error);
                }
            }
        };
        fetchUser();
    }, [dispatch]);

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
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
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logoGaming} alt="Gaming" className={cx('logo')} />
                </Link>

                <div className={cx('actions')}>
                    {isLogin ? (
                        <Menu items={isLogin ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            {isLogin ? (
                                <div className={cx('user-infor')}>
                                    <img
                                        src="https://img.freepik.com/free-vector/cute-dog-looking-cartoon-vector-icon-illustration-animal-nature-icon-isolated-flat-vector_138676-12277.jpg?semt=ais_hybrid&w=740"
                                        className={cx('user-avatar')}
                                        alt={state.user?.userName}
                                    />
                                    <h3 className={cx('name')}>{state.user?.userName}</h3>
                                </div>
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    ) : (
                        <>
                            <Button outline small to={config.routes.login}>
                                Login
                            </Button>
                            <Button primary small style={{ padding: '5px 16px' }} to={config.routes.signup}>
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

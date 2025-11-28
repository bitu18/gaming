import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import PageTitle from '~/component/PageTitle';
import PopperWrapper from '~/component/Popper';
import Button from '~/component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleInfo, faComment, faUser, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faSquareInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import EditProfile from './EditProfile/EditProfile';
import TitlePage from '~/component/TitlePage';
import * as userService from '~/serivces/userService';
import { useEffect, useState } from 'react';
import { actions, useStore } from '~/store';

const cx = classNames.bind(style);
function Profile() {
    const [state, dispatch] = useStore();
    const [userInfor, setUserInfor] = useState([]);
    const [openEdit, setOpenEdit] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await userService.getInforUser();

                if (userData.errorCode === 0) {
                    const orginalDate = userData.data.create_date;
                    const formattedDate = new Date(orginalDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    });

                    setUserInfor({
                        ...userData.data,
                        create_date: formattedDate,
                    });
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUser();
    }, []);

    const handleUpdateUser = (res) => {
        if (res.errorCode === 0) {
            const originalDate = res.data.create_date;

            // If back-end DID NOT return a create_date, use the old one
            const dateToUse = originalDate || userInfor.create_date;
            let formattedDate = dateToUse;

            // Re-format the date same as first load
            // Only format if it's a real date string
            if (!isNaN(new Date(dateToUse).getTime())) {
                formattedDate = new Date(dateToUse).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                });
            }

            const updatedUser = {
                ...res.data,
                create_date: formattedDate,
            };

            dispatch(actions.loginSuccess(updatedUser));
            setUserInfor(updatedUser); // Update with new data from server
        }

        setOpenEdit(false);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                {/* <PageTitle title="Profile" /> */}
                <TitlePage title="Profile" />

                <div className={cx('infor-wrapper')}>
                    <PopperWrapper className={cx('popper')}>
                        <div className={cx('title')}>
                            <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                            <h2>Profile</h2>
                        </div>

                        <div className={cx('section')} onClick={() => setOpenEdit('username')}>
                            <Button className={cx('btn')}>
                                <span>
                                    Username: <p className={cx('text')}>{userInfor.userName}</p>
                                </span>
                            </Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                        <div className={cx('section')} onClick={() => setOpenEdit('email')}>
                            <Button className={cx('btn')}>
                                <span>
                                    Email: <p className={cx('text')}>{userInfor.email}</p>
                                </span>
                            </Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                        <div className={cx('section')} onClick={() => setOpenEdit('username')}>
                            <Button className={cx('btn')}>
                                <span>
                                    Dashboard Layout:
                                    <p className={cx('text')}>{userInfor.roleId === 'S' ? 'Student' : 'Teacher'}</p>
                                </span>
                            </Button>
                        </div>
                        <div className={cx('section')}>
                            <Button className={cx('btn')}>
                                <span>
                                    Joined: <p className={cx('text')}>{userInfor.create_date}</p>
                                </span>
                            </Button>
                        </div>
                    </PopperWrapper>

                    <PopperWrapper className={cx('popper')}>
                        <div className={cx('title')}>
                            <FontAwesomeIcon icon={faUserPen} className={cx('user-icon')} />
                            <h2>Account settings</h2>
                        </div>
                        <div className={cx('section')} onClick={() => setOpenEdit('password')}>
                            <Button className={cx('btn')}>
                                <span>Update password</span>
                            </Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                        <div className={cx('section')} onClick={() => setOpenEdit('delete')}>
                            <Button className={cx('btn')}>
                                <span>Delete account</span>
                            </Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                        <div className={cx('section')}>
                            <Button className={cx('btn', 'btn-custom')}>
                                Switch to {userInfor.roleId === 'S' ? 'Teacher' : 'Student'} layout
                            </Button>
                        </div>
                        <div className={cx('section')}>
                            <Button className={cx('btn-custom')}>Log out</Button>
                        </div>
                    </PopperWrapper>
                </div>

                <div className={cx('infor-wrapper')}>
                    <PopperWrapper className={cx('popper')}>
                        <div className={cx('title')}>
                            <FontAwesomeIcon icon={faCircleInfo} className={cx('user-icon')} />
                            <h2>Support</h2>
                        </div>
                        <div className={cx('section')}>
                            <Button className={cx('btn')}>
                                <span>
                                    Contact us: <p className={cx('text')}>Questlix@gmail.com</p>
                                </span>
                            </Button>
                        </div>
                        <div className={cx('section')}>
                            <Button className={cx('btn')}>Terms of Service</Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                        <div className={cx('section')}>
                            <Button className={cx('btn')}>Privacy Policy</Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                    </PopperWrapper>

                    <PopperWrapper className={cx('popper')}>
                        <div className={cx('title')}>
                            <FontAwesomeIcon icon={faComment} className={cx('user-icon')} />
                            <h2>Social Media</h2>
                        </div>
                        <div className={cx('section')}>
                            <Button
                                className={cx('btn-custom')}
                                leftIcon={<FontAwesomeIcon icon={faSquareFacebook} className={cx('social-icon')} />}
                            >
                                Facebook
                            </Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                        <div className={cx('section')}>
                            <Button
                                className={cx('btn-custom')}
                                leftIcon={<FontAwesomeIcon icon={faSquareInstagram} className={cx('social-icon')} />}
                            >
                                Instagram
                            </Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                        <div className={cx('section')}>
                            <Button
                                className={cx('btn-custom')}
                                leftIcon={<FontAwesomeIcon icon={faSquareTwitter} className={cx('social-icon')} />}
                            >
                                Twitter
                            </Button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('right-icon')} />
                        </div>
                    </PopperWrapper>
                </div>
            </div>

            {openEdit && (
                <EditProfile
                    userInfor={userInfor}
                    mode={openEdit}
                    onClose={() => setOpenEdit(false)}
                    onSubmit={handleUpdateUser}
                />
            )}
        </>
    );
}

export default Profile;

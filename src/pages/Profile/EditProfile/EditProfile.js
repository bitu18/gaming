import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import PopperWrapper from '~/component/Popper';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/component/Button';
import Tippy from '@tippyjs/react';
import { deleteUserAccount, updateUserInfor, userLogout } from '~/serivces/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function EditProfile({ userInfor, mode, onClose, onSubmit }) {
    const [username, setUsername] = useState(userInfor?.userName || '');
    const [email, setEmail] = useState(userInfor?.email || '');
    const [showChangePass, setShowChangePass] = useState(mode === 'password' ? true : false);
    const [deleteAccount, setDeleteAccount] = useState(mode === 'delete' ? true : false);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === 'password') {
                if (password !== confirmPass) {
                    toast.error('Passwords do not match!', {
                        position: 'bottom-right',
                        autoClose: 3000,
                    });
                    return;
                }

                const result = await updateUserInfor({ password });

                if (result.errorCode === 0) {
                    toast.success(result.errorMessage, { position: 'bottom-right', autoClose: 3000 });
                    userLogout();
                    onSubmit(result);
                    onClose();
                } else {
                    toast.error(result.errorMessage, { position: 'bottom-right', autoClose: 3000 });
                }
            } else if (mode === 'username' || mode === 'email') {
                const result = await updateUserInfor({ userName: username, email });

                if (result.errorCode === 0) {
                    toast.success(result.errorMessage, { position: 'bottom-right', autoClose: 3000 });
                    onSubmit(result);
                    onClose();
                } else {
                    toast.error(result.errorMessage, { position: 'bottom-right', autoClose: 3000 });
                }
            } else if (mode === 'delete') {
                await deleteUserAccount();
                toast.success('Account deleted successfully!', { position: 'bottom-right', autoClose: 3000 });
                await userLogout();
                onSubmit(); // callback to parent
                onClose();
                navigate('/login');
            }
        } catch (err) {
            toast.error('Something went wrong!', { position: 'bottom-right', autoClose: 3000 });
            console.error(err);
        }
    };
    return (
        <div className={cx('wrapper')} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <PopperWrapper className={cx('popper')}>
                    <div className={cx('header')}>
                        <h3>Edit Profile</h3>
                        <FontAwesomeIcon icon={faXmark} className={cx('close')} onClick={onClose} />
                    </div>

                    <form className={cx('form')} onSubmit={handleSubmit}>
                        {mode !== 'delete' && (
                            <div className={cx('form-group')}>
                                <label>Email</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        )}

                        {mode === 'password' && (
                            <>
                                <div className={cx('form-group')}>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPass}
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {mode === 'username' && (
                            <div className={cx('form-group')}>
                                <label>Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        )}

                        {mode === 'delete' && (
                            <div className={cx('form-group')}>
                                <h3>Are you sure you want to permanently delete your account?</h3>
                            </div>
                        )}

                        <button type="submit" className={cx('save-btn')}>
                            Save Changes
                        </button>
                    </form>
                </PopperWrapper>
            </div>
        </div>
    );
}

export default EditProfile;

import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import PopperWrapper from '~/component/Popper';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/component/Button';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function EditProfile({ userInfor, onClose, onSubmit }) {
    const [username, setUsername] = useState(userInfor?.userName || '');
    const [email, setEmail] = useState(userInfor?.email || '');

    // const [formData, setFormData] = useState({
    //     firstName: userInfor?.firstName || '',
    //     lastName: userInfor?.lastName || '',
    //     roleId: userInfor?.roleId || '',
    //     signupMethod: '',
    //     email: '',
    //     userName: userInfor?.userName || '',
    //     month: '',
    //     year: '',
    // });

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            email: email,
            userName: username,
        };

        onSubmit(updatedData); // callback to parent
    };
    return (
        <div className={cx('wrapper')} onClick={onClose}>
            <PopperWrapper className={cx('popper')}>
                <div className={cx('header')}>
                    <h3>Edit Profile</h3>
                    <FontAwesomeIcon icon={faXmark} className={cx('close')} onClick={onClose} />
                </div>

                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <button type="submit" className={cx('save-btn')}>
                        Save Changes
                    </button>
                </form>
            </PopperWrapper>
        </div>
    );
}

export default EditProfile;

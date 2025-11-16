import classNames from 'classnames/bind';
import styles from '../Profile.module.scss';
import PopperWrapper from '~/component/Popper';

const cx = classNames.bind(styles);

function EditProfile() {
    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <label>Pick a username that's fun and unique!</label>
            </PopperWrapper>
        </div>
    );
}

export default EditProfile;

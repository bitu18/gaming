import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './TitleForLogin.module.scss';

const cx = classNames.bind(styles);
function TitleForLogin({ title, subtitle }) {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>{title}</h1>
            <p className={cx('subtitle')}>{subtitle}</p>
        </div>
    );
}

TitleForLogin.prototype = {
    title: PropTypes.string,
};
export default TitleForLogin;

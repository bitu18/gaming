import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LogInAndSignUp.module.scss';
import { Link, useLocation } from 'react-router-dom';
import config from '~/config';
import images from '~/assets/images';
import Button from '~/component/Button';
import PopperWrapper from '~/component/Popper';

const cx = classNames.bind(styles);
function LogInAndSignUp({ children }) {
    const location = useLocation();
    const isLoginPage = location.pathname === config.routes.login;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('grid wide')}>
                    <div className={cx('header')}>
                        <Link to={config.routes.home} className={cx('logo-link')}>
                            <img src={images.logoGaming} alt="logo" className={cx('logo')} />
                        </Link>

                        {isLoginPage ? (
                            <Button normal small className={cx('btn')} to={config.routes.signup}>
                                Sign up
                            </Button>
                        ) : (
                            <Button normal small className={cx('btn')} to={config.routes.login}>
                                Log in
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <PopperWrapper className={cx('popper')}>{children}</PopperWrapper>
            </div>
        </div>
    );
}

LogInAndSignUp.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LogInAndSignUp;

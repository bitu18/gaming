import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';
// import Sidebar from '~/layouts/components/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper grid')}>
            <Header />

            {/* <Sidebar /> */}
            <div className={cx('container wide')}>
                    <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;

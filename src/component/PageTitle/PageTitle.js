import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PageTitle.module.scss';

const cx = classNames.bind(styles);

function PageTitle({ title }) {
    return (
        <div className={cx('wrapper')}>
            <h1>{title}</h1>
        </div>
    );
}

PageTitle.propTypes = {
    title: PropTypes.string,
};

export default PageTitle;

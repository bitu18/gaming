import classNames from 'classnames/bind';
import styles from './TitlePage.module.scss';

const cx = classNames.bind(styles);

function TitlePage({ title }) {
    return <h1 className={cx('title')}>{title}</h1>;
}

export default TitlePage;

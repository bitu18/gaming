import classNames from 'classnames/bind';
import styles from './Games.module.scss';
import TitlePage from '~/component/TitlePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/component/Button';
import { faChalkboard, faGamepad } from '@fortawesome/free-solid-svg-icons';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Games() {
    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Games" />

            <div className={cx('inner')}>
                <Button className={cx('classrooms')} to={routes.gameTypes.replace(':type', 'classroom-screen-games')}>
                    <FontAwesomeIcon icon={faChalkboard} className={cx('icon')} />
                    <span className={cx('label')}>Classroom Screen Games</span>
                </Button>

                <Button className={cx('classrooms')} to={routes.gameTypes.replace(':type', 'live-multiplayer-games')}>
                    <FontAwesomeIcon icon={faGamepad} className={cx('icon')} />
                    <span className={cx('label')}>Live Multiplayer games</span>
                </Button>
            </div>
        </div>
    );
}

export default Games;

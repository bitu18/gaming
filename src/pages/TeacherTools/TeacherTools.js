import classNames from 'classnames/bind';
import styles from './TeacherTools.module.scss';
import TitlePage from '~/component/TitlePage';
import iconGrimoireTimer from '~/assets/images/Icon-GrimoireTimer.png';

const cx = classNames.bind(styles);

function TeacherTools() {
    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Teacher Tools" />

            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <div className={cx('type')}>Tools & Timers</div>
                    <div className="row big-gutter">
                        <div className="col l-1-7 mt-15">
                            <a className={cx('tool-item')} href="/play/grimoire-timer">
                                <div className={cx('icon-tile')}>
                                    <img className={cx('icon')} src={iconGrimoireTimer} alt="Grimoire Timer" />
                                </div>
                                <h2 className={cx('title')}>Grimoire Timer</h2>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherTools;

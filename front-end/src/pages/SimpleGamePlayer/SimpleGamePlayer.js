import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SimpleGamePlayer.module.scss';

const cx = classNames.bind(styles);

// Player for lightweight, non-Unity games (plain HTML/CSS/JS) that live
// under public/games/<gameId>/index.html. Unity WebGL builds still go
// through GamePlayer instead.
function SimpleGamePlayer() {
    const { gameId } = useParams();

    return (
        <div className={cx('wrapper')}>
            <iframe
                className={cx('frame')}
                src={`/games/${gameId}/index.html`}
                title={gameId}
                allow="fullscreen"
            />
        </div>
    );
}

export default SimpleGamePlayer;

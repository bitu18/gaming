import classNames from 'classnames/bind';
import styles from './Explore.module.scss';
import TitlePage from '~/component/TitlePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/component/Button';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import exploreImage from '~/assets/images/default-image.jpg';

const cx = classNames.bind(styles);

function Explore() {
    const [typing, setTyping] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);

    const handleOnChangeInput = (e) => {
        setTyping(e.target.value);
        if (e.target.value.length > 0) {
            setActiveSearch(true);
        } else {
            setActiveSearch(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Explore" />

            <div className={cx('inner')}>
                <div className={cx('search')}>
                    <input
                        value={typing}
                        type="text"
                        className={cx('input')}
                        placeholder="Search for courses, articles, and more..."
                        onChange={handleOnChangeInput}
                    />
                    <Button className={cx('btn-search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon-search')} />
                    </Button>
                </div>

                <div className={cx('content')}>
                    <a className={cx('game-item')} href="/game/hangman">
                        <img
                            className={cx('image')}
                            src="https://m.media-amazon.com/images/I/81dPZl4IP4L.jpg"
                            alt="Explore"
                        />
                        <h2 className={cx('title')}>Name of the Game</h2>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Explore;

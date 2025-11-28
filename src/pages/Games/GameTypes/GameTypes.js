import classNames from 'classnames/bind';
import styles from './GameTypes.module.scss';
import TitlePage from '~/component/TitlePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/component/Button';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import posterSpellbreaker from '~/assets/images/Poster-Spellbreaker.png';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function GameTypes() {
    const { type } = useParams();
    const [typing, setTyping] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);

    const isClassroom = type === 'classroom-screen-games';
    const isMultiplayer = type === 'live-multiplayer-games';

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
            {isClassroom && <TitlePage title="Classroom Screen Games" />}
            {isMultiplayer && <TitlePage title="Live Multiplayer Games" />}

            <div className={cx('inner')}>
                {/* Searchbar */}
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
                    {isClassroom && (
                        <div className={cx('explore grid')}>
                            <div className="row big-gutter">
                                <div className="col l-1-7 mt-30">
                                    <a className={cx('game-item')} href={`/games/${type}/hangman`}>
                                        <img className={cx('image')} src={posterSpellbreaker} alt="Game" />
                                        <h2 className={cx('title')}>Spellbreaker</h2>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {isMultiplayer && (
                        <div className={cx('explore grid')}>
                            <div className="row big-gutter">
                                <div className="col l-1-7 mt-30">
                                    <a className={cx('game-item')} href={`/games/${type}/gaminggaming`}>
                                        <img
                                            className={cx('image')}
                                            src="https://media.printler.com/media/photo/184142.jpg?rmode=crop&width=638&height=900"
                                            alt="Game"
                                        />
                                        <h2 className={cx('title')}>Gaming</h2>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameTypes;

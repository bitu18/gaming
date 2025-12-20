import classNames from 'classnames/bind';
import styles from './Games.module.scss';
import TitlePage from '~/component/TitlePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/component/Button';
import { faChalkboard, faGamepad, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import posterSpellbreaker from '~/assets/images/Poster-Spellbreaker.png';
import routes from '~/config/routes';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Description from './components/Description';

const cx = classNames.bind(styles);

function Games() {
    let { gameId } = useParams();
    const [typing, setTyping] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);
    const [description, setDescription] = useState(false);

    // gameId = 'spellbreaker';

    // const isClassroom = type === 'classroom-screen-games';
    // const isMultiplayer = type === 'live-multiplayer-games';

    const handleOnChangeInput = (e) => {
        setTyping(e.target.value);
        if (e.target.value.length > 0) {
            setActiveSearch(true);
        } else {
            setActiveSearch(false);
        }
    };
    return (
        <>
            {description && <Description onClose={() => setDescription(false)} />}

            <div className={cx('wrapper')}>
                <TitlePage title="Games" />

                <div className={cx('inner')}>
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
                            <div className={cx('explore grid')}>
                                <h2 className={cx('type')}>Classroom Screen Games</h2>
                                <div className="row big-gutter">
                                    <div className="col l-1-7 mt-15">
                                        <div className={cx('game-item')} onClick={() => setDescription(true)}>
                                            <img className={cx('image')} src={posterSpellbreaker} alt="Game" />
                                            <h2 className={cx('title')}>Spellbreaker</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('explore grid')}>
                                <h2 className={cx('type')}>Live Multiplayer Games</h2>
                                <div className="row big-gutter">
                                    <div className="col l-1-7 mt-15">
                                        {/* <a className={cx('game-item')} href={`/games/${type}/gaminggaming`}>
                                            <img
                                                className={cx('image')}
                                                src="https://media.printler.com/media/photo/184142.jpg?rmode=crop&width=638&height=900"
                                                alt="Game"
                                            />
                                            <h2 className={cx('title')}>Gaming</h2>
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Games;

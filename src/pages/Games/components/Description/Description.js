import classNames from 'classnames/bind';
import styles from './Description.module.scss';
import posterSpellbreaker from '~/assets/images/Poster-Spellbreaker.png';
import { useParams } from 'react-router-dom';
import Button from '~/component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Description({ onClose }) {
    const { category, gameId } = useParams();
    return (
        <div className={cx('wrapper')} onClick={onClose}>
            <div className={cx('card')} onClick={(e) => e.stopPropagation()}>
                <img className={cx('image')} src={posterSpellbreaker} alt="Game" />
                <Button className={cx('icon__close')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmarkSquare} />
                </Button>

                {/* TEXT ON TOP */}
                <div className={cx('content')}>
                    <h1 className={cx('title')}>Spellbreaker</h1>

                    <div className={cx('badges')}>
                        <span>Classroom</span>
                        <span>Review</span>
                        <span>Class Collaboration</span>
                    </div>

                    <p className={cx('description')}>
                        Spellbreaker is a Hangman-inspired game reimagined as an MMO-style battle. Players choose
                        letters to attack the enemy—correct guesses deal damage, while mistakes come at a cost. Simple,
                        strategic, and team-driven.
                    </p>

                    <a className={cx('link')} href={`/game/hangman`}>
                        PLAY NOW
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Description;

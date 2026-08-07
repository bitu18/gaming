import React from 'react';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faMagnifyingGlass, faScrewdriverWrench, faFileLines } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
    return (
        <section className={cx('hero')}>
            <img className={cx('banner')} src={images.bannerHome} alt="QuestLix fantasy castle" />

            <div className={cx('container')}>
                <div className={cx('left')}>
                    <h1>
                        Everything you need
                        <br />
                        for an <span>amazing</span> class.
                    </h1>

                    <p>
                        Worksheets, tools, and games to save you
                        <br />
                        time and make learning more fun.
                    </p>

                    <div className={cx('search')}>
                        <input placeholder="Search worksheets, tools, games..." />

                        <button>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>

                    <div className={cx('quickLinks')}>
                        <button>
                            <FontAwesomeIcon icon={faFileLines} />
                            Browse Worksheets
                        </button>

                        <button>
                            <FontAwesomeIcon icon={faScrewdriverWrench} />
                            Use Tools
                        </button>

                        <button>
                            <FontAwesomeIcon icon={faGamepad} />
                            Play Games
                        </button>
                    </div>
                </div>

                {/* <div className={cx('right')}>
                    <img src={images.bannerHome} alt="Hero" />
                </div> */}
            </div>
        </section>
    );
}

export default Home;

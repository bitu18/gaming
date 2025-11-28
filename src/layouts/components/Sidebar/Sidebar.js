import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import Button from '~/component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChalkboardUser,
    faClockRotateLeft,
    faGamepad,
    faListUl,
    faPlay,
    faPlus,
    faStore,
} from '@fortawesome/free-solid-svg-icons';
// import { faNoteSticky, faPenToSquare, faUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faFaceSmile, faFileLines, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const STUDENT_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGamepad} />,
        title: 'Games',
        to: '/games',
    },
    {
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        title: 'Create Quest',
        to: '/create',
    },
    {
        icon: <FontAwesomeIcon icon={faListUl} />,
        title: 'My Quests',
        to: '/worksheet',
    },
    {
        icon: <FontAwesomeIcon icon={faFaceSmile} />,
        title: 'Characters',
        to: '/character',
    },
    {
        icon: <FontAwesomeIcon icon={faFolderOpen} />,
        title: 'Worksheets',
        to: '/worksheets',
    },
    {
        icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
        title: 'Player Log',
        to: '/playerLog',
    },
    {
        icon: <FontAwesomeIcon icon={faStore} />,
        title: 'Merchant',
        to: '/market',
    },
];

const TEACHER_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGamepad} />,
        title: 'Games',
        to: '/game',
    },
    {
        icon: <FontAwesomeIcon icon={faListUl} />,
        title: 'My Quests',
        to: '/worksheet',
    },
    {
        icon: <FontAwesomeIcon icon={faChalkboardUser} />,
        title: 'My Classes',
        to: '/classes',
    },
    {
        icon: <FontAwesomeIcon icon={faFileLines} />,
        title: 'Homework',
        to: '/homework',
    },
    {
        icon: <FontAwesomeIcon icon={faFolderOpen} />,
        title: 'Worksheets',
        to: '/worksheets',
    },
];

const cx = classNames.bind(styles);

function Sidebar() {
    const [studentUser, setStudentUser] = useState(true);

    return (
        <aside className={cx('wrapper')}>
            <Button
                primary
                large
                leftIcon={<FontAwesomeIcon icon={studentUser ? faPlay : faPlus} />}
                className={cx('btn')}
            >
                {studentUser ? 'Play' : 'Create'}
            </Button>

            <Menu>
                {(studentUser ? STUDENT_ITEMS : TEACHER_ITEMS).map((item, index) => (
                    <MenuItem key={index} title={item.title} to={item.to} icon={item.icon} />
                ))}
            </Menu>

            <Button primary small leftIcon={<FontAwesomeIcon icon={faPlus} />} className={cx('btn--upgrade')}>
                Upgrade to Epic Tier
            </Button>
        </aside>
    );
}

export default Sidebar;

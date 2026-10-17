import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
// import {
//     HomeIcon,
//     HomeIconActive,
//     UserGroupIcon,
//     UserGroupIconActive,
//     LiveIcon,
//     LiveIconActive,
// } from 'src/component/Icons';
import config from '~/config';
import SuggestedAccounts from '~/component/SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            {/* <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeIconActive />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupIconActive />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveIconActive />} />
            </Menu> */}

            <SuggestedAccounts label="Suggested Accounts" />
            <SuggestedAccounts label="Following Accounts" />
        </aside>
    );
}

export default Sidebar;

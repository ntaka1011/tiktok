import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu from '~/components/Popper/Menu';
import MenuItem from '~/components/Popper/Menu/MenuItem';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For Your" to={config.routes.home} icon={null} />
        <MenuItem title="Following" to={config.routes.following} icon={null} />
        <MenuItem title="Live" to={config.routes.live} icon={null} />
      </Menu>
    </aside>
  );
}

export default Sidebar;

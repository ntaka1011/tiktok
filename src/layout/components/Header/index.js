import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react';
import config from '~/config';
// tippy css
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faQuestionCircle,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import { UploadIcon } from '~/components/icons';
import { InboxIcon } from '~/components/icons';
import { MessageIcon } from '~/components/icons';
import Image from '~/components/images';
import { Link } from 'react-router-dom';

// bind giúp ta trả ra một function là cx
// viết đc cx(post-item)
const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    // cứ có children là menu cấp 2
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const currentUser = false;
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'lauguage':
        //handle change language
        break;
      default:
    }
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/linh',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Setting',
      to: '/Setting',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      // thằng nào có separete là có cái gạch
      separate: true,
    },
  ];
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div>
          <Link to={config.routes.home} className={cx('logo-link')}>
            <img src={images.logo.default} alt="tiktok" />
          </Link>
        </div>
        <Search />
        <div className={cx('action')}>
          {currentUser ? (
            <>
              {/* tippy don laf show character bottom */}
              <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                <button className={cx('action-btn')}>
                  <UploadIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]} content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                </button>
              </Tippy>
              <div className={cx('notifications')}>12</div>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                src="https://p16-sign-va.tiktokcn.com/tos-maliva-avt-0068/b4ce423d43e1c90483d4db4893441658~c5_100x100.jpeg?x-expires=1680832800&x-signature=HEQlO5W6Uvea2p5peY80IN09Occ%3D"
                alt="linh"
                className={cx('user-avatar')}
                fallback="https://scontent.xx.fbcdn.net/v/t1.15752-9/258584371_3104280086495655_5695964282985043349_n.jpg?stp=dst-jpg_s206x206&_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_ohc=2LnmNoQVgoIAX-9fhBC&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSDG8dJjVOxJnYr3BWmBcobSeuAawpTdwZ0Jrbo_Oa4oQ&oe=6454D86B"
              ></Image>
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;

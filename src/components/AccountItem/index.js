import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../images';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  console.log('🚀 ~ file: index.js:11 ~ AccountItem ~ data:', data);
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <Image
        className={cx('avatar')}
        src={data.avatar}
        alt={data.full_name}
        fallback="https://scontent.xx.fbcdn.net/v/t1.15752-9/258584371_3104280086495655_5695964282985043349_n.jpg?stp=dst-jpg_s206x206&_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_ohc=2LnmNoQVgoIAX-9fhBC&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSDG8dJjVOxJnYr3BWmBcobSeuAawpTdwZ0Jrbo_Oa4oQ&oe=6454D86B"
      />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.name}</span>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </h4>
        <span className={cx('username')}>{data.username}</span>
      </div>
    </Link>
  );
}
AccountItem.prototype = {
  data: PropTypes.object,
};
export default AccountItem;

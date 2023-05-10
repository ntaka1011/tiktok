import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, hideOnClick = false, ...passProps }) {
  //lần đầu tiền nó sâu ra thì nó trang đầu tiên của mảng
  // obj là đại điện trang hiện tại
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  console.log(history);
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            isParent && setHistory((prev) => [...prev, item.children]);
            if (!isParent) {
              onChange(item);
            }
          }}
        />
      );
    });
  };
  const renderResult = (attrs) => (
    <div tabIndex="-1" {...attrs} className={cx('menu-list')}>
      <PopperWrapper>
        {history.length > 1 && (
          <Header
            title={current.title}
            onBack={() => {
              // xxoas phần tử vì thằng current luôn là phần tử cuối
              setHistory((prev) => prev.slice(0, prev.length - 1));
            }}
          />
        )}
        <div className={cx('menu-body')}>{renderItems()}</div>
      </PopperWrapper>
    </div>
  );
  const handleResetToFirstPage = () => {
    setHistory((prev) => prev.slice(0, 1));
  };
  return (
    <Tippy
      {...passProps}
      interactive
      placement="bottom-end"
      delay={[0, 1000]}
      offset={[12, 8]}
      hideOnClick={false}
      render={renderResult}
      onHide={handleResetToFirstPage}
    >
      {children}
    </Tippy>
  );
}
Menu.prototype = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
  hideOnClick: PropTypes.bool,
};
export default Menu;

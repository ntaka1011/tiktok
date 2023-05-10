import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  leftIcon = false,
  rightIcon = false,
  small = false,
  large = false,
  children,
  className,
  onClick,
  // lấy hết các props
  ...passProps
}) {
  // xem reset button , a
  let Component = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  //remove event listener when btn disable
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = 'a';
  }
  const classes = cx('wrapper', {
    primary,
    // nó đặt ten biến thì đặt dấu ngoặc vuông để nó lây value
    [className]: className,
    outline,
    small,
    large,
    text,
    rounded,
    disabled,
  });

  return (
    <Component className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
    </Component>
  );
}
Button.prototype = {
  to: PropTypes.string,
  href: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  small: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;

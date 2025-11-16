import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
    children,
    to,
    href,
    primary = false,
    normal = false,
    outline = false,
    rounded = false,
    disabled = false,
    text,
    small = false,
    medium = false,
    large = false,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passComp
}) {
    let Comp = 'button';

    const props = {
        onClick,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        normal,
        rounded,
        outline,
        text,
        disabled,
        small,
        medium,
        large,
        [className]: className,
    });

    return (
        <Comp className={classes} {...props} {...passComp}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    href: PropTypes.string,
    normal: PropTypes.bool,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};
export default Button;

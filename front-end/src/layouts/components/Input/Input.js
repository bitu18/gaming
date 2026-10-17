import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from '~/component/Button';

const cx = classNames.bind(styles);
function Input({ placeholder, label, name, value, type, showPassword,
    setShowPassword,onChange }) {
    return (
            <>
            <h3 className={cx('label')}>{label}</h3>

            <div className={cx('wrapper')}>
                <input
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    className={cx('input')}
                />

                {name === 'password' && (
                    <Button small onClick={() => setShowPassword(!showPassword)} className={cx('show-password-btn')}>
                        <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </Button>
                )}
            </div>
            </>
    );
}

Input.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
};

export default Input;

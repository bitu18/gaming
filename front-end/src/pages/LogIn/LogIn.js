import classNames from 'classnames/bind';
import Input from '~/layouts/components/Input';
import TitleForLogin from '~/layouts/components/TitleForLogin';
import Button from '~/component/Button';
import styles from './LogIn.module.scss';
import { useState } from 'react';
// import ButtonMethod from '~/layouts/components/ButtonMethod';
import * as userService from '~/serivces/userService';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function LogIn() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isDisabled = !formData.email || !formData.password;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const result = await login({ email: formData.email, password: formData.password });

        if (result.success) {
            const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');

            if (storedUser?.role === 'admin') {
                // Navigate to admin dashboard
            } else if (storedUser?.role === 'teacher') {
                // Navigate to teacher dashboard
            } else {
                navigate('/');
            }
        } else {
            setErrorMessage(result.message);
        }
        setIsLoading(false);
    };

    // const handleLoginByGoogle = async (dataUser) => {
    //     setErrorMessage('');
    //     try {
    //         const result = await userService.userLoginByGoogle(dataUser.sub, dataUser.email);
    //         if (result.code !== 0) {
    //             setErrorMessage(result.message);
    //             return;
    //         } else {
    //             dispatch(actions.loginSuccess(result.user));
    //             navigate('/');
    //         }
    //     } catch (error) {
    //         console.error('Error logging in with Google:', error);
    //         setErrorMessage('Google login failed!');
    //     }
    // };
    // const login = useLogin(handleLoginByGoogle);

    return (
        <div className={cx('wrapper')}>
            <TitleForLogin title="Welcome back!" subtitle="Log in to your toolkit." />
            <Input
                label="Email"
                placeholder="abc@gmail.com"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <Input
                label="Password"
                placeholder="•••••••••"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
            {errorMessage && <span className={cx('error-message')}>{errorMessage}</span>}
            <Button primary medium disabled={isDisabled} className={cx('btn')} onClick={handleSubmit}>
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <a href="/" className={cx('forgot-password')}>
                Forgot password?
            </a>

            <div className={cx('separate')}>
                <div className={cx('separate-line')}></div>
                <span className={cx('separate-text')}>or</span>
                <div className={cx('separate-line')}></div>
            </div>

            <p className={cx('signup')}>
                Don't have an account?
                <Link to="/signup" className={cx('signup_link')}>
                    {' '}
                    Sign up
                </Link>
            </p>
            {/* <ButtonMethod
                onClick={() => login()}
                imgSrc="https://ac.blooket.com/assets/common/google.png"
                title="Google"
            /> */}
        </div>
    );
}

export default LogIn;

import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import TitleForLogin from '~/layouts/components/TitleForLogin';
import Button from '~/component/Button';

import { useState } from 'react';
import Input from '~/layouts/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { register } = useAuth();

    const isDisabled = !formData.name || !formData.email || !formData.password;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccess('');

        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
        });

        if (result.success) {
            setSuccess('Register successfull! Redirecting to verification...');
            setTimeout(() => navigate('/verify-email', { state: { email: result.user.email } }), 1500);
        } else {
            setErrorMessage(result.message);
        }
        setIsLoading(false);
    };

    return (
        <div className={cx('wrapper')}>
            <TitleForLogin title="Create Account" subtitle="Sign up for your toolkit." />

            <Input
                label="Full Name"
                placeholder="John Doe"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
            />
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
            {success && <span className={cx('success-message')}>{success}</span>}

            <Button primary medium disabled={isDisabled} className={cx('btn')} onClick={handleSubmit}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <div className={cx('separate')}>
                <div className={cx('separate-line')}></div>
                <span className={cx('separate-text')}>or</span>
                <div className={cx('separate-line')}></div>
            </div>

            <p className={cx('login')}>
                Already have an account?
                <Link to="/login" className={cx('login_link')}>
                    {' '}
                    Log in
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

export default SignUp;

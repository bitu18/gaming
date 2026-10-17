import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './VerifyEmail.module.scss';
import TitleForLogin from '~/layouts/components/TitleForLogin';
import Button from '~/component/Button';
import Input from '~/layouts/components/Input';
import * as userService from '~/serivces/userService';

const cx = classNames.bind(styles);

function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();


    // get email passed form register page
    const emailFromState = location.state?.email || '';
    const [email, setEmail] = useState(emailFromState);

    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const isDisabled = !email || !code;

    const handleVerify = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        setSuccess('');

        try {
            const res = await userService.verifyEmail(email, code);

            if(res.success) {
                setSuccess("Email verified successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setErrorMessage(res.message || 'Verification failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage(error.res?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon')}>✉</div>

            <TitleForLogin
                title="Verify Your Email"
                subtitle="Enter the 6-digit sent to your email."
            />

             {!emailFromState && (
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            )}

            <Input
                label="Verification Code"
                placeholder="Enter 6-digit code"
                name="verificationCode"
                type="text"
                maxLength="6"
                value={code}
                onChange={(e) => {
                    setCode(e.target.value);
                }}
            />

                <span className={cx('error-message')}>{errorMessage}</span>
                {success && <span className={cx('success-message')}>{success}</span>}
                {errorMessage && <span className={cx('error-message')}>{errorMessage}</span>}

                   <Button primary medium disabled={isDisabled} className={cx('btn')} onClick={handleVerify}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </Button>
        </div>
    );
}

export default VerifyEmail;

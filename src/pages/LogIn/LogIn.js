import classNames from 'classnames/bind';
import Input from '~/layouts/components/Input';
import TitleForLogin from '~/layouts/components/TitleForLogin';
import Button from '~/component/Button';
import styles from './LogIn.module.scss';
import { useState } from 'react';
import ButtonMethod from '~/layouts/components/ButtonMethod';
import * as userService from '~/serivces/userService';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '~/hooks';
import { actions, useStore } from '~/store';

const cx = classNames.bind(styles);

function LogIn() {
    const [, dispatch] = useStore();
    const [userNameOrEmail, setUserNameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isDisabled = !userNameOrEmail || !password;

    const handleLoginByEmail = async () => {
        setErrorMessage('');
        try {
            const result = await userService.userLoginByEmail(userNameOrEmail, password);

            // the email && password are correct
            if (result.code !== 0) {
                setErrorMessage(result.message);
                return;
            } else {
                dispatch(actions.loginSuccess(result.user));
                navigate('/');
            }
        } catch (error) {
            throw error;
        }
    };

    const handleLoginByGoogle = async (dataUser) => {
        setErrorMessage('');
        try {
            const result = await userService.userLoginByGoogle(dataUser.sub, dataUser.email);
            if (result.code !== 0) {
                setErrorMessage(result.message);
                return;
            } else {
                dispatch(actions.loginSuccess(result.user));
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging in with Google:', error);
            setErrorMessage('Google login failed!');
        }
    };
    const login = useLogin(handleLoginByGoogle);

    return (
        <div className={cx('wrapper')}>
            <TitleForLogin title="Log In" />
            <Input
                placeholder="Username or Email"
                name="userNameOrEmail"
                type="email"
                value={userNameOrEmail}
                onChange={(e) => {
                    setUserNameOrEmail(e.target.value);
                    setErrorMessage('');
                }}
            />
            <Input
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                }}
            />
            <span className={cx('error-message')}>{errorMessage}</span>
            <Button primary medium disabled={isDisabled} className={cx('btn')} onClick={handleLoginByEmail}>
                Login
            </Button>
            <div className={cx('separate')}>
                <div className={cx('separate-line')}></div>
                <span className={cx('separate-text')}>or</span>
                <div className={cx('separate-line')}></div>
            </div>
            <ButtonMethod
                onClick={() => login()}
                imgSrc="https://ac.blooket.com/assets/common/google.png"
                title="Google"
            />
        </div>
    );
}

export default LogIn;

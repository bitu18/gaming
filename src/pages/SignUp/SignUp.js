import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import TitleForLogin from '~/layouts/components/TitleForLogin';
import Button from '~/component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Fragment, useState } from 'react';
import ButtonMethod from '~/layouts/components/ButtonMethod';
import Input from '~/layouts/components/Input';
import * as userService from '~/serivces/userService';
import { useLogin } from '~/hooks';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignUp() {
    const [showMonth, setShowMonth] = useState(false);
    const [showYear, setShowYear] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        roleId: '',
        signupMethod: '',
        email: '',
        validEmail: true,
        codeVerification: '',
        password: '',
        confirmPassword: '',
        userName: '',
        month: '',
        year: '',
        googleId: '',
    });

    const [step, setStep] = useState(1);

    const isDisabled =
        (step === 1 && (!formData.roleId || !formData.month || !formData.year)) ||
        (step === 2 && !formData.signupMethod) ||
        (step === 3 && (!formData.email || !formData.validEmail)) ||
        (step === 4 && !formData.codeVerification) ||
        (step === 5 && (!formData.password || !formData.confirmPassword)) ||
        (step === 6 && (!formData.firstName || !formData.lastName));

    // Array.from(object, mapFunction, thisValue)
    // returns an array from any object with a length property.
    const monthList = Array.from({ length: 12 }, (_, i) => {
        // console.log(monthList);  [0,1,2,3,4,5,6,7,8,9,10,11]

        const date = new Date(0, i);
        return {
            value: i + 1,
            label: date.toLocaleString('default', { month: 'long' }), // 'toLocaleString' formats the date, 'default' uses the system's locale, { month: 'long' } tells it to return the full month name
        };
    });

    const yearList = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const handleValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChangeInput = async (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            const isChecked = handleValidEmail(value);
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                validEmail: isChecked,
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        setErrorMessage('');
    };

    const handleChooseType = (roleId) => {
        setFormData((prev) => ({ ...prev, roleId }));
    };

    const handleSignupUserByGoogle = async (dataUser) => {
        setErrorMessage('');
        try {
            setFormData((prev) => ({
                ...prev,
                email: dataUser.email,
                googleId: dataUser.sub,
                validEmail: true,
            }));

            // Direct to step 6
            setStep(6);
        } catch (error) {
            console.error('Error logging in with Google:', error);
            setErrorMessage('Google signup failed!');
        }
    };

    const signupEmail = useLogin(handleSignupUserByGoogle);

    const handleChooseSignupMethod = (type) => {
        if (type === 'email') {
            setFormData((prev) => ({ ...prev, signupMethod: 'email' }));
        } else if (type === 'google') {
            setFormData((prev) => ({ ...prev, signupMethod: 'google' }));

            signupEmail();
        }
    };

    const handleNext = async () => {
        if (step === 3) {
            try {
                const isCheckedEmailExisted = await userService.checkExistedEmail(formData.email);
                if (isCheckedEmailExisted.errorCode !== 0) {
                    setErrorMessage(isCheckedEmailExisted.errorMessage);
                    return;
                } else {
                    const res = await userService.sendCodeToConfirm(formData.email);
                    if (res.errorCode !== 0) {
                        console.error('Failed to send verification code');
                        return;
                    }
                    setErrorMessage('');
                }
            } catch (error) {
                console.error('Error verifying code:', error);
                return;
            }
        }

        if (step === 4) {
            try {
                const verificationCode = await userService.verifyCode(formData.email, formData.codeVerification);
                if (verificationCode.errorCode !== 0) {
                    setErrorMessage(verificationCode.errorMessage);
                    return; // STOP here — do NOT advance to next step until the user type correct code
                }
                setErrorMessage('');
            } catch (error) {
                console.error('Error verifying code:', error);
                return;
            }
        }

        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        const dateOfBirthYearMonth = `${formData.year}-${formData.month}`;
        const { roleId, email, password, firstName, lastName, userName, googleId, signupMethod } = formData;

        const payload = {
            roleId,
            email,
            firstName,
            lastName,
            userName,
            dateOfBirthYearMonth,
            signupMethod,
        };

        if (signupMethod === 'email') {
            payload.password = password;
        } else if (signupMethod === 'google') {
            payload.googleId = googleId;
        } else {
            setErrorMessage('Invalid signup method.');
            return;
        }

        try {
            let res;
            if (signupMethod === 'email') {
                res = await userService.userSignupByEmail(payload);
            } else {
                res = await userService.userSignupByGoogle(payload);
            }

            if (res.errorCode !== 0) {
                setErrorMessage(res.errorMessage);
            } else {
                // Navigate to home page
                navigate('/');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrorMessage('Signup failed. Please try again later.');
        }
    };

    const handleResendCode = async () => {
        try {
            setErrorMessage('We just resent the verification code, please check your email.');
            const res = await userService.sendCodeToConfirm(formData.email);
            if (res.errorCode !== 0) {
                setErrorMessage('Failed to send verification code, Please resend again!');
                return;
            }
            // setErrorMessage('');
        } catch (error) {
            console.error('Error verifying code:', error);
            return;
        }
    };

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <TitleForLogin title="Sign Up" />

                {/* First Step */}
                {step === 1 && (
                    <div className={cx('option')}>
                        <h3 className={cx('title')}>Who are you?</h3>

                        <div className={cx('btn-option')}>
                            <Button
                                primary
                                className={cx('btn', { active: formData.roleId === 'S' })}
                                onClick={() => handleChooseType('S')}
                            >
                                Student
                            </Button>
                            <Button
                                primary
                                className={cx('btn', { active: formData.roleId === 'T' })}
                                onClick={() => handleChooseType('T')}
                            >
                                Teacher
                            </Button>
                        </div>

                        <h3 className={cx('title')}>Age</h3>

                        <div className={cx('btn-option')}>
                            <div>
                                <Tippy
                                    interactive
                                    offset={[0, 0]}
                                    placement="bottom-start"
                                    visible={showMonth}
                                    onClickOutside={() => setShowMonth(false)}
                                    render={(attrs) => (
                                        <div className={cx('dropdown', 'dropdown--month')} tabIndex="-1" {...attrs}>
                                            {monthList.map((month) => (
                                                <div
                                                    key={month.value}
                                                    className={cx('dropdown-item', 'dropdown-item--month')}
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, month: month.label }));
                                                        setShowMonth(false);
                                                    }}
                                                >
                                                    {month.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                >
                                    <div className={cx('wrapper-option')}>
                                        <Button
                                            rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                                            className={cx('option-date')}
                                            onClick={() => setShowMonth(!showMonth)}
                                        >
                                            {formData.month || 'Month'}
                                        </Button>
                                    </div>
                                </Tippy>
                            </div>
                            <div className={cx('separate')}>/</div>
                            <div>
                                <Tippy
                                    interactive
                                    offset={[0, 0]}
                                    placement="bottom-start"
                                    visible={showYear}
                                    onClickOutside={() => setShowYear(false)}
                                    render={(attrs) => (
                                        <div className={cx('dropdown', 'dropdown--year')} tabIndex="-1" {...attrs}>
                                            {yearList.map((year) => (
                                                <div
                                                    key={year}
                                                    className={cx('dropdown-item', 'dropdown-item--year')}
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, year }));
                                                        setShowYear(false);
                                                    }}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                >
                                    <div className={cx('wrapper-option')}>
                                        <Button
                                            rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                                            className={cx('option-date')}
                                            onClick={() => setShowYear(!showYear)}
                                        >
                                            {formData.year || 'Year'}
                                        </Button>
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className={cx('option')}>
                        <h3 className={cx('title')}>Choose a sign up method</h3>
                        <ButtonMethod
                            className={cx({ active: formData.signupMethod === 'email' })}
                            title="Email & Password"
                            leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                            onClick={() => handleChooseSignupMethod('email')}
                        />
                        <ButtonMethod
                            onClick={() => handleChooseSignupMethod('google')}
                            imgSrc="https://ac.blooket.com/assets/common/google.png"
                            title="Google"
                        />
                    </div>
                )}

                {step === 3 && (
                    <div className={cx('option')}>
                        <h3 className={cx('title')}>Enter your email</h3>
                        <Input
                            placeholder="Your email"
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChangeInput}
                        />
                        <span className={cx('error-message')}>{errorMessage}</span>
                    </div>
                )}
                {step === 4 && (
                    <div className={cx('option')}>
                        <h3 className={cx('title')}>Enter verification code</h3>
                        <p
                            className={cx('des')}
                        >{`We just sent a code to ${formData.email}, Please enter it below.`}</p>
                        <Input
                            placeholder="6-digit code"
                            name="codeVerification"
                            type="text"
                            value={formData.codeVerification}
                            onChange={handleChangeInput}
                        />
                        <span className={cx('error-message')}>{errorMessage}</span>

                        <p>
                            Didn’t get the code?{' '}
                            <Button onClick={handleResendCode} className={cx('btn-resend')}>
                                Resend
                            </Button>
                        </p>
                    </div>
                )}
                {step === 5 && (
                    <div className={cx('option')}>
                        <h3 className={cx('title')}>Create a password</h3>
                        <p className={cx('des')}>
                            Passwords must be at least 6 characters long and contain at least one lowercase letter, one
                            uppercase letter, and one number.
                        </p>
                        <Input
                            placeholder="Your password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChangeInput}
                        />
                        <Input
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChangeInput}
                        />
                        <span className={cx('error-message')}>{errorMessage}</span>
                    </div>
                )}
                {step === 6 && (
                    <div className={cx('option')}>
                        <h3 className={cx('title')}>Enter your first name</h3>
                        <Input
                            placeholder="Your first name"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChangeInput}
                        />
                        <span className={cx('error-message')}>{errorMessage}</span>
                        <div className={cx('option')}>
                            <h3 className={cx('title')}>Enter your last name</h3>
                            <Input
                                placeholder="Your last name"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChangeInput}
                            />
                            <span className={cx('error-message')}>{errorMessage}</span>
                        </div>
                    </div>
                )}
                {step === 7 && (
                    <div className={cx('option')}>
                        <h3 className={cx('title')}>Enter your username</h3>
                        <Input
                            placeholder="Username"
                            name="userName"
                            type="text"
                            value={formData.userName}
                            onChange={handleChangeInput}
                        />
                        <span className={cx('error-message')}>{errorMessage}</span>
                    </div>
                )}
            </div>
            <div className={cx('btn-nextStep')}>
                {step >= 2 && step < 7 && (
                    <Button outline small onClick={handleBack}>
                        Back
                    </Button>
                )}
                {step < 7 && (
                    <Button primary small onClick={handleNext} disabled={isDisabled}>
                        Next
                    </Button>
                )}

                {step === 7 && (
                    <Button primary disabled={!formData.userName} className={cx('btn-submit')} onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </div>
        </Fragment>
    );
}

export default SignUp;

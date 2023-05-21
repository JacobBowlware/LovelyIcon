// React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/config';

// Toastify
import { toast, ToastContainer } from 'react-toastify';

// Components
import TextHighlight from '../common/TextHighlight';
import { validateChange } from '../common/WebJoi';
import LoadingSpinner from '../common/LoadingSpinner';
import { addNewUserCredits, creditsAdded } from '../../firebase/HandleNewUser.js';

const actionCodeSettings = {
    url: 'https://lovelyicon.com/email-verification/',
    handleCodeInApp: true,
};

const Signup = ({ UID }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (UID && auth.currentUser.emailVerified)
            navigate('/icon-generator/');
    }, [UID, navigate]);

    const handleChange = ({ currentTarget: Input }) => {
        validateChange(Input, setErrors, false, password, confirmPassword);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user, actionCodeSettings);

            // Redirect to email verification page
            navigate('/email-verification/');
            window.location.reload();
        }
        catch (error) {
            toast.error("Email already in use");
        }

        setLoading(false);
    };

    const handleSignupWthGoogle = async (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithPopup(auth, provider).then((result) => {
            if (!creditsAdded())
                addNewUserCredits(result.user.uid);

            navigate('/icon-generator/');
            window.location.reload();
        }
        ).catch((error) => {
            toast.error("An error occurred while signing in with Google");
        });
        setLoading(false);
    }

    return (
        <div className="container form-container">
            <ToastContainer />
            <form className="form" onSubmit={(e) => handleSignup(e)}>
                <h1 className="header-1 form__header">
                    Signup for Lovely<TextHighlight>Icon</TextHighlight>
                </h1>
                <button
                    className="btn btn-primary form__btn-google"
                    onClick={(e) => handleSignupWthGoogle(e)} >
                    Continue with&nbsp;<TextHighlight>Google</TextHighlight>
                </button>
                <p className="form__splitter">OR</p>
                <input
                    className="form__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                        handleChange(e);
                    }}
                    autoComplete='email'
                />
                {errors.email && <p className="form__error">{errors.email}</p>}
                <input
                    className="form__input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                        handleChange(e);
                    }}
                    autoComplete='new-password'
                />
                {errors.password && <p className="form__error">{errors.password}</p>}
                <input
                    className="form__input"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        handleChange(e);
                    }}
                    autoComplete='new-password'
                />
                {errors.confirmPassword && <p className="form__error">{errors.confirmPassword}</p>}
                <button
                    className="btn btn-primary form__btn"
                    type="submit"
                    disabled={
                        (errors.password || errors.email || errors.confirmPassword)
                        || (!email || !password || !confirmPassword)
                    } >
                    <LoadingSpinner color='light' title="Signup" loading={loading} />
                </button>
                <p>
                    Already have an account? <Link className="link login-form__link" to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
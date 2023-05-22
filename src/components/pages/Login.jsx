// React
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../firebase/config';

// Toastify
import { toast, ToastContainer } from 'react-toastify';

// Components
import TextHighlight from '../common/TextHighlight';
import { validateProperty } from '../common/WebJoi';
import { addNewUserCredits, creditsAdded } from '../../firebase/HandleNewUser.js';

/**
 * Login page
 * @returns Login page
 */
const Login = ({ UID }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (UID) {
            navigate('/icon-generator/');
        }
    }, [UID, navigate]);

    const handleEmailChange = ({ currentTarget: Input }) => {
        const error = validateProperty(Input);
        setEmailError(error);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/icon-generator/');
            })
            .catch((error) => {
                toast.error("Invalid email or password");
            });
    }

    const handleLoginWithGoogle = async (e) => {
        e.preventDefault();

        signInWithPopup(auth, provider).then(async (result) => {
            const credAdded = await creditsAdded(result.user.uid);
            if (!credAdded)
                await addNewUserCredits(result.user.uid);

            navigate('/icon-generator/');
            window.location.reload();
        }
        ).catch((error) => {
            toast.error("An error occured while trying to login with Google");
        });
    }

    return (
        <div className="container form-container">
            <ToastContainer />
            <form
                className="form"
                onSubmit={(e) => handleLogin(e)}
            >
                <h1 className="header-1 form__header">Login to Lovely<TextHighlight>Icon</TextHighlight></h1>
                <button
                    className="btn btn-primary form__btn-google"
                    onClick={(e) => handleLoginWithGoogle(e)}
                >
                    Continue with&nbsp;<TextHighlight>Google</TextHighlight>
                </button>
                <p className="form__splitter">OR</p>
                <input
                    className="form__input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        handleEmailChange(e);
                    }}
                    autoComplete='current-email'
                />
                {emailError && <p className="form__error">{emailError}</p>}
                <input
                    className="form__input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    autoComplete='current-password'
                />
                <button
                    type="submit"
                    className="btn btn-primary form__btn"
                    disabled={emailError || !password || !email}>
                    Login
                </button>
                <p>
                    Don't have an account? <Link className="link login-form__link" to="/sign-up">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../firebase/config';

import TextHighlight from '../common/TextHighlight';

/**
 * Login page
 * @returns Login page
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    /**
     * Handle login with email and password
     */
    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/profile');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    /**
     * Handle login with Google
     */
    const handleLoginWithGoogle = (e) => {
        e.preventDefault();

        signInWithPopup(auth, provider).then((result) => {
            // const user = result.user;
            navigate('/profile');
        }
        ).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }


    return (
        <div className="container form-container">
            <form
                className="form"
                onSubmit={(e) => handleLogin(e)}
            >
                <h1 className="header-1 form__header">Login to Lovely<TextHighlight>Icon</TextHighlight></h1>
                <button
                    className="btn btn-primary form__btn-google"
                    onClick={(e) => handleLoginWithGoogle(e)}
                >
                    Login with <TextHighlight>Google</TextHighlight>
                </button>
                <p>OR</p>
                <input
                    className="form__input"
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    className="form__input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="btn btn-primary form__btn">
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
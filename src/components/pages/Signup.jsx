// React
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/config';

// Components
import TextHighlight from '../common/TextHighlight';
import { validateChange } from '../common/WebJoi';

/**
 * Signup Page
 * @returns Signup Page
 */
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: Input }) => {
        console.log(password, confirmPassword)
        validateChange(Input, setErrors, false, password, confirmPassword);
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (errors.email || errors.password || errors.confirmPassword) {
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/profile');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    const handleSignupWthGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider).then((result) => {
            navigate('/profile');
        }
        ).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    return (
        <div className="container form-container">
            <form className="form" onSubmit={(e) => handleSignup(e)}>
                <h1 className="header-1 form__header">
                    Signup for Lovely<TextHighlight>Icon</TextHighlight>
                </h1>
                <button
                    className="btn btn-primary form__btn-google"
                    onClick={(e) => handleSignupWthGoogle(e)} >
                    Signup with <TextHighlight>Google</TextHighlight>
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
                />
                {errors.confirmPassword && <p className="form__error">{errors.confirmPassword}</p>}
                <button
                    className="btn btn-primary form__btn"
                    type="submit"
                    disabled={
                        (errors.password || errors.email || errors.confirmPassword)
                        || (!email || !password || !confirmPassword)
                    } >
                    Signup
                </button>
                <p>
                    Already have an account? <Link className="link login-form__link" to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
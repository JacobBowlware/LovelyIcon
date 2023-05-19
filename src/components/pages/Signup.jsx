// React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider, app } from '../../firebase/config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Components
import TextHighlight from '../common/TextHighlight';
import { validateChange } from '../common/WebJoi';
import LoadingSpinner from '../common/LoadingSpinner';

const db = getFirestore(app);

const Signup = ({ UID }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (UID)
            navigate('/icon-generator/');
    }, [UID, navigate]);

    const handleChange = ({ currentTarget: Input }) => {
        validateChange(Input, setErrors, false, password, confirmPassword);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password).then((result) => {
            // Redirect to the icon generator
            navigate('/icon-generator/');
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
        setLoading(false);
    };

    const handleSignupWthGoogle = async (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithPopup(auth, provider).then((result) => {
            if (isNewUser(result.user.metadata.creationTime))
                addNewUserCredits(result.user.uid);

            navigate('/icon-generator/');
        }
        ).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
        setLoading(false);
    }

    const isNewUser = (creationTime) => {
        const now = new Date();
        const creationDate = new Date(creationTime);
        const diff = now - creationDate;

        // If the user was created less than 1 minute ago, they are a new user
        if (diff < 60000) {
            return true;
        }
        return false;
    }

    const addNewUserCredits = async (UID) => {
        await setDoc(doc(db, "users", UID), {
            credits: 5
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
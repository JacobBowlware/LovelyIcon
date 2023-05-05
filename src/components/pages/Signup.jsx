import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import TextHighlight from '../common/TextHighlight';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container form-container">
            <form className="form" onSubmit={(e) => handleSignup(e)}>
                <h1 className="header-1 form__header">
                    Signup for Lovely<TextHighlight>Icon</TextHighlight>
                </h1>
                <button className="btn btn-primary form__btn-google">
                    Signup with <TextHighlight>Google</TextHighlight>
                </button>
                <p>OR</p>
                <input
                    className="form__input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="form__input"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="btn btn-primary form__btn">Signup</button>
                <p>
                    Already have an account? <Link className="link login-form__link" to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
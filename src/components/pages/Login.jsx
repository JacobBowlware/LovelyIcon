import React, { useState } from 'react';

// Custom Components
import TextHighlight from '../common/TextHighlight';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        console.log(email, password);
    }

    return (
        <div className="container login">
            <form
                className="login-form"
                onSubmit={(e) => handleLogin(e)}
            >
                <h1 className="header-1 login__header">Login to Lovely<TextHighlight>Icon</TextHighlight></h1>
                <input
                    className="login-form__input"
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    className="login-form__input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button type="submit" className="btn btn-primary login-form__btn">Login</button>
                <p className="p login-form__p">
                    Don't have an account? <Link className="link login-form__link" to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
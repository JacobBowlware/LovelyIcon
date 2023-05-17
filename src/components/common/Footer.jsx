// React
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import TextHighlight from './TextHighlight';
import Logout from './Logout';

const Footer = ({ email }) => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        Logout(navigate);
    }

    let footerLinks = (
        <ul className="container list footer-container">
            <li className="footer-item">
                <Link className="link footer-item__link" to="/login">Login</Link>
            </li>
            <li className="footer-item">
                <a className="link footer-item__link footer-item__link-main" href="/#home">Lovely<TextHighlight>Icon</TextHighlight></a>
            </li>
            <li className="footer-item">
                <a className="link footer-item__link" href="mailto:support@lovelyicon.com">Contact</a>
            </li>
        </ul>
    )

    if (email) {
        footerLinks = (
            <ul className="container list footer-container">
                <li className="footer-item">
                    <Link className="link footer-item__link" onClick={(e) => handleLogout(e)}>Logout</Link>
                </li>
                <li className="footer-item">
                    <a className="link footer-item__link footer-item__link-main" href="/#home">Lovely<TextHighlight>Icon</TextHighlight></a>
                </li>
                <li className="footer-item">
                    <a className="link footer-item__link" href="mailto:jacobbowlware@gmail.com?subject=Contact%20LovelyIcon">Contact</a>
                </li>
            </ul>
        );
    }

    return (
        <div className="container footer">
            {footerLinks}
        </div>
    );
}

export default Footer;
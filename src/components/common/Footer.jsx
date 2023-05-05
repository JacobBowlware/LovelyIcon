import React from 'react';
import TextHighlight from './TextHighlight';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="container footer">
            <ul className="container list footer-container">
                <li className="footer-item">
                    <Link className="link footer-item__link" to="/login">Login</Link>
                </li>
                <li className="footer-item">
                    <a className="link footer-item__link footer-item__link-main" href="/#home">Lovely<TextHighlight>Icon</TextHighlight></a>
                </li>
                <li className="footer-item">
                    <Link className="link footer-item__link" to="/create-account">Contact</Link>
                </li>
            </ul>
        </div>
    );
}

export default Footer;
<div>

</div>
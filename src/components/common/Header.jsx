import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = ({ email }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const closeNavBar = () => {
        setIsOpen(false);
    }

    const loggedOutHeaderItems = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <a
                    className="nav-link active"
                    aria-current="page"
                    href="/#home"
                    onClick={closeNavBar}
                >
                    Home
                </a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="/#features"
                    onClick={closeNavBar}
                >Features</a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="/#showcase"
                    onClick={closeNavBar}
                >Showcase</a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="/#pricing"
                    onClick={closeNavBar}
                >Pricing</a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="/#faq"
                    onClick={closeNavBar}
                >FAQ</a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="mailto:Support@LovelyIcon.com"
                    onClick={closeNavBar}
                >Contact</a>
            </li>
        </ul>
    );

    const loggedInHeaderItems = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link
                    className="nav-link nav-link-important"
                    to="/icon-generator/"
                    onClick={closeNavBar}>
                    Icon Generator
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link nav-link-important"
                    to="/icons/"
                    onClick={closeNavBar}>
                    Icons
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link nav-link-important"
                    to="/add-credits/"
                    onClick={closeNavBar} >
                    Add Credits
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link nav-link-important"
                    to="/profile/"
                    onClick={closeNavBar}>
                    Profile
                </Link>
            </li>
        </ul>
    );


    return (
        <div className="header">
            <nav id="navbar" className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="nav-link navbar-brand" to="/"
                        onClick={closeNavBar}
                    >Lovely<span className="text-highlight">Icon</span></Link>
                    <button className="navbar-toggler" type="button" onClick={handleToggle}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav" collapsed>
                        {email ? loggedInHeaderItems : loggedOutHeaderItems}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;

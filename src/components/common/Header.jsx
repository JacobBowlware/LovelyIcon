import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const navLinks = document.querySelectorAll('.navbar-nav a');

// Add an event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Check if the navbar is open on mobile devices
        console.log("HERERERER");
        if (window.innerWidth < 1000) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarToggler.classList.contains('show')) {
                // Close the navbar
                navbarToggler.click();
            }
        }
    });
});

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const closeNavBar = () => {
        setIsOpen(false);
    }

    return (
        <div className="header">
            <nav id="navbar" className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Lovely<span className="text-highlight">Icon</span></Link>
                    <button className="navbar-toggler" type="button" onClick={handleToggle}>
                        <FontAwesomeIcon className="navbar-toggler-icon" icon={isOpen ? faTimes : faBars} />
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav" collapsed>
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
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;

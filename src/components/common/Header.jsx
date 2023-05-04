import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="header">
            <nav id="navbar" class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Lovely<span className="text-highlight">Icon</span></Link>
                    <button class="navbar-toggler" type="button" onClick={handleToggle}>
                        <FontAwesomeIcon class="navbar-toggler-icon" icon={isOpen ? faTimes : faBars} />
                    </button>
                    <div class={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav" collapsed>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/#home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#features">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#showcase">Showcase</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#pricing">Pricing</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="mailto:Support@LovelyIcon.com">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;

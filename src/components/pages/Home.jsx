import React from 'react';
import { Link } from 'react-router-dom';

import friends from '../../assets/friends.svg';

const Home = () => {
    return (
        <div className="page home">
            <div className="grid-2">
                <div className="grid-item hero">
                    <h1 className="header-1 text-secondary">
                        Personalize Your Online Presence with <span className="text-highlight">Lovely Icons</span>
                    </h1>
                    <p className="text-secondary p">
                        Create beautiful, customized icons that look professional and lovely for any purpose with our easy-to-use icon generator.
                    </p>
                    <Link href="/" className="btn btn-primary home__hero-link">Get Started</Link>
                </div>
                <div className="img-wrapper">
                    <img className="img home__hero-img" src={friends} />
                </div>
            </div>
        </div>
    );
}

export default Home;
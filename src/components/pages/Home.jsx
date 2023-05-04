import React from 'react';
import { Link } from 'react-router-dom';

import friends from '../../assets/friends.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';



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
                    <Link to="/login" className="btn btn-primary home__hero-link">Get Started</Link>
                </div>
                <div className="img-wrapper">
                    <img className="img home__hero-img" src={friends} />
                </div>
            </div>
            <div className="grid-2 features">
                <div className="img-wrapper">
                    {/* TODO: Change this image to layers of three images of our product working */}
                    <img className="img home__hero-img" src={friends} />
                </div>
                <div className="grid-item grid-reverse">
                    <h2 className="header-2 text-secondary">Customizable Icons for Any Purpose</h2>
                    <p className="p features-p">
                        Customize icons to your heart's content <span className='text-highlight'>
                            without any design experience
                        </span>. Our <span className='text-highlight'>AI-powered</span> tool
                        generates <span className='text-highlight'>beautiful</span> icons based on your
                        preferences in <span className="text-highlight">  just a few clicks
                        </span>. Choose the style, size, and color of
                        your icons and make them fully <span className="text-highlight">personalized</span> for your needs.
                    </p>
                    <ul className="list features-list">
                        <li className="list-item features__list-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> &nbsp;Generate multiple icons at once
                        </li>
                        <li className="list-item features__list-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> &nbsp;Select one to crop and preview.
                        </li>
                        <li className="list-item features__list-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> &nbsp;Edit using AI
                        </li>
                        <li className="list-item features__list-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> &nbsp;Resize and download
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
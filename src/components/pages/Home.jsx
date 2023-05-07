// React
import React from 'react';
import { Link } from 'react-router-dom';

// Icons / Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import friends from '../../assets/friends.svg';

// Components
import Icon from '../common/Icon';
import TextHighlight from '../common/TextHighlight';
import FAQAccordian from '../other/FAQAccordian';
import PricingCard from '../other/PricingCard';

const iconList = [
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
    {
        image: friends,
    },
]

const Home = () => {

    return (
        <div className="page home">
            <div className="grid-2 container" id="home">
                <div className="grid-item hero">
                    <h1 className="header-1 text-secondary-c">
                        Personalize Your Online Presence with <TextHighlight>Lovely Icons</TextHighlight>
                    </h1>
                    <p className="text-secondary-c p">
                        Create beautiful, customized icons that look professional and lovely for any purpose with our easy-to-use icon generator.
                    </p>
                    <Link to="/login" className="btn btn-primary home__hero-link">Get Started</Link>
                </div>
                <div className="img-wrapper">
                    <img className="img home__hero-img" src={friends} />
                </div>
            </div>
            <div className="features" id="features">
                <div className="container grid-2">
                    <div className="img-wrapper">
                        {/* TODO: Change this image to layers of three images of our product working */}
                        <img className="img home__hero-img" src={friends} />
                    </div>
                    <div className="grid-item grid-reverse">
                        <h2 className="header-2 text-secondary-c">Customizable Icons for Any Purpose</h2>
                        <p className="p features-p">
                            Customize icons to your heart's content <TextHighlight>
                                without any design experience
                            </TextHighlight>. Our <TextHighlight>AI-powered</TextHighlight> tool
                            generates <TextHighlight>beautiful</TextHighlight> icons based on your
                            preferences in <TextHighlight>  just a few clicks
                            </TextHighlight>. Choose the style, size, and color of
                            your icons and make them fully <TextHighlight>personalized</TextHighlight> for your needs.
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
            <div className="showcase container" id="showcase">
                <h3 className="header-2 text-secondary-c">
                    <TextHighlight>Stunning</TextHighlight> Icons
                    Made <TextHighlight>Easy</TextHighlight>: See What Our Users Have Created
                </h3>
                <div className="grid-3 showcase__container">
                    {iconList.map((icon, index) => {
                        return (
                            <div className="grid-item showcase__item" key={index}>
                                <Icon image={icon.image} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="cta">
                <div className="container cta-container">
                    <h3 className="header-2 text-secondary-c cta__header">
                        Looking for a <TextHighlight>simple</TextHighlight> way to <TextHighlight>create stunning
                            icons? </TextHighlight> Our tool has got you covered.
                        <TextHighlight> Start designing now!</TextHighlight>
                    </h3>
                    <Link to="/login" className="btn btn-primary cta__btn">Get Started Now</Link>
                </div>
            </div>
            <div className="container pricing" id="pricing">
                <h3 className="header-2 text-secondary-c pricing__header">
                    Pricing and Credits
                </h3>
                <div className="pricing__container">
                    <div className="grid-item">
                        <PricingCard
                            title="50 Credits"
                            price="$5"
                            listItems={
                                [
                                    "Generate up to 5 icons",
                                    "Access to all customization options",
                                    "6 icon designs to choose from",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                        />
                    </div>
                    <div className="grid-item">
                        <PricingCard
                            title="120 Credits"
                            price="$10"
                            listItems={
                                [
                                    "Generate up to 12 icons",
                                    "Access to all customization options",
                                    "6 icon designs to choose from",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                        />
                    </div>
                    <div className="grid-item">
                        <PricingCard
                            title="300 Credits"
                            price="$25"
                            listItems={
                                [
                                    "Generate up to 30 icons",
                                    "Access to all customization options",
                                    "6 icon designs to choose from",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                        />
                    </div>
                </div>
                <div className="container faq" id="faq">
                    <h3 className="header-2 text-secondary-c faq__header">Frequently Asked Questions</h3>
                    <FAQAccordian />
                </div>
            </div>
        </div>
    );
}

export default Home;
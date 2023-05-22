// React
import React from 'react';
import { Link } from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// Images & Icons
import basketball1 from '../../assets/icons/basketball1.png';
import coffee1 from '../../assets/icons/coffee1.png';
import compass from '../../assets/icons/compass.png';
import earth from '../../assets/icons/earth.png';
import man1 from '../../assets/icons/man1.png';
import mic from '../../assets/icons/mic.png';
import music from '../../assets/icons/music.png';
import neonCar from '../../assets/icons/neonCar.png';
import penguin from '../../assets/icons/penguin.png';
import rocket from '../../assets/icons/rocket.png';
import time1 from '../../assets/icons/time1.png';
import tree1 from '../../assets/icons/tree1.png';
import wizard2 from '../../assets/icons/wizard2.png';
import villain1 from '../../assets/icons/villain1.png';
import gorillaSword from '../../assets/icons/gorillaSword.png';
import credit1Icon from '../../assets/icons/credit1Icon.png';
import credit2Icon from '../../assets/icons/credit2Icon.png';
import credit3Icon from '../../assets/icons/credit3Icon.png';

// Components
import Icon from '../common/Icon';
import TextHighlight from '../common/TextHighlight';
import FAQAccordian from '../other/FAQAccordian';
import PricingCard from '../other/PricingCard';

const iconList = [
    {
        image: coffee1,
    },
    {
        image: compass,
    },
    {
        image: earth,
    },
    {
        image: man1,
    },
    {
        image: mic,
    },
    {
        image: music,
    },
    {
        image: villain1,
    },
    {
        image: penguin,
    },
    {
        image: rocket,
    },
    {
        image: time1,
    },
    {
        image: gorillaSword,
    },
    {
        image: basketball1,
    },
    {
        image: tree1,
    },
    {
        image: wizard2,
    },
    {
        image: neonCar,
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
                    <Link to="/login" className="btn btn-primary home__hero-link">Get Started for Free</Link>
                </div>
                <div className="img-wrapper">
                    <img className="img home__hero-img" src={time1} alt="Icon created by OpenAI API" />
                </div>
            </div>
            <div className="features" id="features">
                <div className="container grid-2">
                    <div className="img-wrapper ">
                        {/* <img className="img home__hero-img icon-process__gif" src={iconProcess} alt="Generate Icons, View them in your icon storage, download them for your own use." /> */}
                    </div>
                    <div className="grid-item grid-reverse">
                        <h2 className="header-2 text-secondary-c features__header">Customizable Icons for Any Purpose</h2>
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
                                <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> &nbsp;Fill in your preferences
                            </li>
                            <li className="list-item features__list-item">
                                <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> &nbsp;Generate multiple icons at once
                            </li>
                            <li className="list-item features__list-item">
                                <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> &nbsp;Download the icons you like
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
                        Unlock your <TextHighlight>creativity</TextHighlight> with our <TextHighlight>user-friendly</TextHighlight> icon
                        generator. <TextHighlight>No graphic design experience required.
                        </TextHighlight> Start designing beautiful icons effortlessly <TextHighlight>today!</TextHighlight>
                    </h3>
                    <Link to="/login" className="btn btn-primary cta__btn">Get Started for Free</Link>
                </div>
            </div>
            <div className="container pricing" id="pricing">
                <h3 className="header-2 text-secondary-c pricing__header">
                    <TextHighlight>Boost Your Account with Credits:</TextHighlight> Flexible Options for Icon Creation
                </h3>
                <div className="pricing__container">
                    <div className="grid-item">
                        <PricingCard
                            title="50 Credits"
                            price="$5"
                            listItems={
                                [
                                    "Generate up to 60 icons",
                                    "Access to all customization options",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                            badge={credit1Icon}
                        />
                    </div>
                    <div className="grid-item">
                        <PricingCard
                            title="110 Credits"
                            price="$10"
                            listItems={
                                [
                                    "10% more credits",
                                    "Generate up to 132 icons",
                                    "Access to all customization options",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                            badge={credit2Icon}
                        />
                    </div>
                    <div className="grid-item">
                        <PricingCard
                            title="240 Credits"
                            price="$20"
                            listItems={
                                [
                                    "20% more credits",
                                    "Generate up to 288 icons",
                                    "Access to all customization options",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                            badge={credit3Icon}
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
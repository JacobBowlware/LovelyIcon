// React
import React from 'react';
import { Link } from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// Images & Icons
import neonIcon from '../../assets/icons/neonIcon.jpg';
import cityIcon from '../../assets/icons/cityIcon.png';
import coolCarIcon from '../../assets/icons/coolCarIcon.png';
import gorillaIcon from '../../assets/icons/gorillaIcon.png';
import greenIcon from '../../assets/icons/greenIcon.png';
import paintIcon from '../../assets/icons/paintIcon.png';
import swordIcon from '../../assets/icons/swordIcon.png';
import lionIcon from '../../assets/icons/lionIcon.png';
import cactus1 from '../../assets/icons/cactus1.png';
import cactus2 from '../../assets/icons/cactus2.png';
import bunkerIcon from '../../assets/icons/bunkerIcon.png';
import sunsetIcon from '../../assets/icons/sunsetIcon.png';
import suitIcon from '../../assets/icons/suitIcon.png';
import heartIcon2 from '../../assets/icons/hearIcon2.png';

// Components
import Icon from '../common/Icon';
import TextHighlight from '../common/TextHighlight';
import FAQAccordian from '../other/FAQAccordian';
import PricingCard from '../other/PricingCard';

const iconList = [
    {
        image: neonIcon,
    },
    {
        image: heartIcon2,
    },
    {
        image: swordIcon,
    },
    {
        image: greenIcon,
    },
    {
        image: suitIcon,
    },
    {
        image: paintIcon,
    },
    {
        image: cactus1,
    },
    {
        image: gorillaIcon,
    },
    {
        image: lionIcon,
    },
    {
        image: coolCarIcon,
    },
    {
        image: bunkerIcon,
    },
    {
        image: sunsetIcon,
    },
    {
        image: cityIcon,
    },
    {
        image: cactus2,
    },
    {
        image: cityIcon,
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
                    <img className="img home__hero-img" src={coolCarIcon} alt="Icon created by OpenAI API" />
                </div>
            </div>
            <div className="features" id="features">
                <div className="container grid-2">
                    <div className="img-wrapper">
                        {/* TODO: Change this image to layers of three images of our product working */}
                        <img className="img home__hero-img" src={gorillaIcon} alt="Icon created by OpenAI API" />
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
                        Unlock your <TextHighlight>creativity</TextHighlight> with our <TextHighlight>user-friendly</TextHighlight> icon
                        generator. <TextHighlight>No graphic design experience required.
                        </TextHighlight> Start designing beautiful icons effortlessly <TextHighlight>today!</TextHighlight>
                    </h3>
                    <Link to="/login" className="btn btn-primary cta__btn">Get Started Now</Link>
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
                                    "Generate up to 5 icons",
                                    "Access to all customization options",
                                    "6 icon designs to choose from",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                            badge={neonIcon}
                        />
                    </div>
                    <div className="grid-item">
                        <PricingCard
                            title="110 Credits"
                            price="$10"
                            listItems={
                                [
                                    "10% more credits",
                                    "Generate up to 12 icons",
                                    "Access to all customization options",
                                    "6 icon designs to choose from",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                            badge={greenIcon}
                        />
                    </div>
                    <div className="grid-item">
                        <PricingCard
                            title="240 Credits"
                            price="$20"
                            listItems={
                                [
                                    "20% more credits",
                                    "Generate up to 30 icons",
                                    "Access to all customization options",
                                    "6 icon designs to choose from",
                                    "High quality PNG file downloads",
                                    "Commercial use"
                                ]
                            }
                            badge={swordIcon}
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
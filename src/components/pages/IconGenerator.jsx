// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Font Awesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

//  Images & Icons
import neonIcon from '../../assets/icons/neonIcon.jpg';
import coolCarIcon from '../../assets/icons/coolCarIcon.png';
import gorillaIcon from '../../assets/icons/gorillaIcon.png';
import greenIcon from '../../assets/icons/greenIcon.png';
import starFighter from '../../assets/icons/starFighter.png';
import towerIcon from '../../assets/icons/towerIcon.png';

// Components
import { generateImages } from '../../firebase/generateImages';
import LoadingSpinner from '../common/LoadingSpinner';

const sampleImages = [
    starFighter,
    neonIcon,
    greenIcon,
    coolCarIcon,
    gorillaIcon,
    towerIcon
];


const artStyleSelectOptions = [
    { value: 'Select Art Style' },
    { value: 'Abstract' },
    { value: 'Cartoon' },
    { value: 'Digital Art' },
    { value: 'Geometric' },
    { value: 'Impressionist' },
    { value: 'Minimalist' },
    { value: 'Pop Art' },
    { value: 'Realistic' },
    { value: 'Retro' },
    { value: 'Surreal' },
    { value: 'Vector Art' },
    { value: 'Watercolor' },
    { value: 'Custom' }
];

const framePositionSelectOptions = [
    { value: 'Select Frame Position' },
    { value: "Bird's Eye View" },
    { value: 'Close-Up' },
    { value: 'Crane Shot' },
    { value: 'Dutch Angle Shot' },
    { value: 'Extreme Close-Up' },
    { value: 'Handheld Shot' },
    { value: 'High Angle Shot' },
    { value: 'Low Angle Shot' },
    { value: 'Long Shot' },
    { value: 'Medium Shot' },
    { value: 'Over-the-Shoulder Shot' },
    { value: 'Point-of-View Shot' },
    { value: 'Tracking Shot' },
    { value: 'Wide Angle Shot' },
    { value: "Worm's Eye View" },
    { value: 'Custom' }
];

const iconLightingSelectOptions = [
    { value: 'Select Icon Lighting' },
    { value: 'Bright' },
    { value: 'Candlelit' },
    { value: 'Dim' },
    { value: 'Dusk' },
    { value: 'Foggy' },
    { value: 'Glowing' },
    { value: 'Golden Hour' },
    { value: 'Moonlit' },
    { value: 'Neon' },
    { value: 'Overcast' },
    { value: 'Rainy' },
    { value: 'Sunny' },
    { value: 'Twilight' },
    { value: 'Custom' }
];

const IconGenerator = ({ UID, creditAmount }) => {
    const [prompt, setPrompt] = useState();
    const [iconStyle, setIconStyle] = useState(null);
    const [framePosition, setFramePosition] = useState(null);
    const [iconLighting, setIconLighting] = useState(null);

    const [generatedIcons, setGeneratedIcons] = useState([]);
    const [userCreditAmount, setUserCreditAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserCreditAmount(creditAmount);
    }, [creditAmount]);

    const generateImage = async () => {
        setLoading(true);
        setUserCreditAmount(userCreditAmount - 5);

        let entirePrompt = `${prompt}. With these specifications: `;

        if (iconStyle) {
            entirePrompt += `${iconStyle} style, `;
        }

        if (framePosition) {
            entirePrompt += `with ${framePosition} framing, `;
        }

        if (iconLighting) {
            entirePrompt += `in ${iconLighting} lighting, `;
        }

        // Firebase function will deduce 5 credits from user's account upon successful generation
        const imageData = await generateImages(entirePrompt, UID);

        if (imageData.error) {
            alert(imageData.error);
            setLoading(false);
            return;
        }

        setGeneratedIcons(imageData.data);
        setLoading(false);
    }

    const handleIconSelect = (icon) => {
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${icon.b64_json}`;
        link.download = 'icon.png';
        link.click();
    }

    return (
        <div className="container page page-padding">
            <h1 className="header-1 icon-generator__header">Generate Icons</h1>
            <div className="icon-generator__container">
                <p className="p icon-generator__container-p">
                    Enter details on your desired icon design, style, and colors. See our <a href="/icon-generator/#tips" className="text-highlight text-link">tips for writing clear icon descriptions</a>.
                </p>
                <form className="icon-generator__container__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        generateImage();
                    }}
                >
                    <div className="form__input-group__double-wide">
                        <select onChange={(e) => setIconStyle(e.target.value)} id="style-dropdown" className="form__input icon-generator__container__form-input">
                            {artStyleSelectOptions.map((option, index) => {
                                return <option key={index} value={option.value}>{option.value}</option>
                            })}
                        </select>
                        <select onChange={(e) => setFramePosition(e.target.value)} id="style-dropdown" className="form__input icon-generator__container__form-input">
                            {framePositionSelectOptions.map((option, index) => {
                                return <option key={index} value={option.value}>{option.value}</option>
                            })}
                        </select>
                    </div>
                    <select onChange={(e) => setIconLighting(e.target.value)} id="style-dropdown" className="form__input icon-generator__container__form-input">
                        {iconLightingSelectOptions.map((option, index) => {
                            return <option key={index} value={option.value}>{option.value}</option>
                        })}
                    </select>
                    <textarea
                        maxLength={400}
                        className='form__input icon-generator__container__form-input text-area'
                        placeholder="Enter a description or prompt for generating the icon (e.g., Dalorean car parked outside an old gas-station).
                        "
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        disabled={userCreditAmount < 10 || !prompt}
                        className="btn btn-primary form__btn icon-generator__container__form-btn">
                        <LoadingSpinner title="GENERATE" loading={loading} color="light" />
                    </button>
                </form>
                <p className="p icon-generator__container-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon-primary" /> You currently have <span className="text-highlight text-semi-bold">{userCreditAmount}</span> credits
                    remaining. Each generate costs <span className="text-highlight text-semi-bold">5</span>. {userCreditAmount < 5 ? <span className="">Add more credits to your
                        account  <Link to="/add-credits" className="text-link text-highlight">here.</Link> </span> : null}
                </p>
            </div>
            <div className="icon-generator__samples">
                <h2 className="header-2 icon-generator__samples-header">
                    {generatedIcons.length > 0 ? "Your Generated Icons; Click on an icon to download it" : "Sample of Generated Icons"}
                </h2>
                <div className="icon-generator__icon-display">
                    {generatedIcons.length > 0 ? (
                        generatedIcons.map((image, index) => (
                            <div onClick={() => handleIconSelect(image)} className="icon-generator__icon-display__icon" key={index}>
                                <img
                                    className="icon-generator__icon-display__icon-img"
                                    src={`data:image/png;base64,${image.b64_json}`}
                                    alt="Icon created by OpenAI API"
                                />
                            </div>
                        ))
                    ) : (
                        sampleImages.map((image, index) => (
                            <div className="icon-generator__icon-display__icon" key={index}>
                                <img
                                    className="icon-generator__icon-display__icon-img icon-generator__icon-display__icon-img--sample"
                                    src={image}
                                    alt="Icon created by OpenAI API"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div id="tips" className="icon-generator__rules-container">
                <ul className="list icon-generator__rules">
                    <h2 className="header-2 icon-generator__rules-header">
                        Tips for Writing Clear Icon Descriptions
                    </h2>
                    <li className="list__item icon-generator__rules-item">
                        <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> <strong>Keep it Simple - </strong>
                        Use clear and concise language. Avoid complex or ambiguous descriptions.
                        <span className="text-semi-bold"> For example</span>,
                        "A happy dog running in a green park" instead of "A dog in a park"
                    </li>
                    <li className="list__item icon-generator__rules-item">
                        <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> <strong>Be Specific - </strong>
                        Include specific details about the objects, colors, and textures you want in your image.
                        <span className="text-semi-bold"> For example</span>,
                        "A brown horse with a white mane" instead of "A horse with some white on it"
                    </li>
                    <li className="list__item icon-generator__rules-item">
                        <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> <strong>Stay on Topic - </strong>
                        Stick to the theme or subject of your image. Avoid including unrelated or unnecessary information.
                        <span className="text-semi-bold"> For example</span> "A red rose with dew drops on its petals" instead of "A flower with water drops on it"
                    </li>
                    <li className="list__item icon-generator__rules-item">
                        <FontAwesomeIcon icon={faCheckCircle} className="icon-primary" /> <strong>Include Your Style - </strong>
                        Feel free to express your unique style preferences for the image. Whether it's a specific artistic approach, a particular aesthetic, or a desired mood, let us know how you envision your ideal image.

                    </li>
                </ul>
            </div>
        </div >
    );
}

export default IconGenerator;
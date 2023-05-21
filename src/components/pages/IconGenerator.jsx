// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Font Awesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

//  Images & Icons
import gorillaIcon from '../../assets/icons/gorillaIcon.png';
import childWarriorIcon from '../../assets/icons/childWarriorIcon.png';
import mysticForestIcon from '../../assets/icons/mysticForestIcon.png';
import solarSystemIcon from '../../assets/icons/solarSystemIcon.png';
import mountIcon from '../../assets/icons/mountIcon.png';
import purplePlanetIcon from '../../assets/icons/purplePlanetIcon.png';

// Toastify
import { toast, ToastContainer } from 'react-toastify';

// Components
import { generateImages } from '../../firebase/generateImages';
import LoadingSpinner from '../common/LoadingSpinner';

const sampleImages = [
    mountIcon,
    childWarriorIcon,
    mysticForestIcon,
    solarSystemIcon,
    gorillaIcon,
    purplePlanetIcon
];


const iconThemeSelectOptions = [
    { value: 'Select Icon Theme' },
    { value: 'Animals' },
    { value: 'Nature' },
    { value: 'Sports' },
    { value: 'Technology' },
    { value: 'Travel' },
    { value: 'Custom' },
];


const cameraViewSelectOptions = [
    { value: 'Select Camera View' },
    { value: 'Birds Eye View' },
    { value: 'Close-up' },
    { value: 'Long Shot' },
    { value: 'Wide Angle' },
    { value: 'Custom' }
];

const iconLightingSelectOptions = [
    { value: 'Select Icon Lighting' },
    { value: 'Bright' },
    { value: 'Dim' },
    { value: 'Sunny' },
    { value: 'Twilight' },
    { value: 'Night' },
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

        let entirePrompt = `${prompt}. `;

        if (iconStyle && iconStyle !== 'Select Icon Theme' && iconStyle !== 'Custom') {
            entirePrompt += `${iconStyle} theme, `;
        }

        if (framePosition && framePosition !== 'Select Frame Position' && framePosition !== 'Custom') {
            entirePrompt += `with ${framePosition} framing, `;
        }

        if (iconLighting && iconLighting !== 'Select Icon Lighting' && iconLighting !== 'Custom') {
            entirePrompt += `in ${iconLighting} lighting, `;
        }

        entirePrompt += ". With an emphasis on these styles: simple, minimalistic, svg, vector illustration, flat illustration, trending on the icon section of Dribbble, Behance, and Artstation, dark gradient background that fills the entire left over canvas, borderless with no white space."

        const imageData = await generateImages(entirePrompt, UID);

        if (imageData.error) {
            toast.error("An error occurred while generating your icon. Please try again later.");
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
            <ToastContainer />
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
                            {iconThemeSelectOptions.map((option, index) => {
                                return <option key={index} value={option.value}>{option.value}</option>
                            })}
                        </select>
                        <select onChange={(e) => setFramePosition(e.target.value)} id="style-dropdown" className="form__input icon-generator__container__form-input">
                            {cameraViewSelectOptions.map((option, index) => {
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
                        placeholder="Enter a description or prompt for generating the icon (e.g. Magical wizard sitting in a chair, vibrant colors, long shot)."
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        // disabled={userCreditAmount < 10 || !prompt}
                        disabled={true}
                        className="btn btn-primary form__btn icon-generator__container__form-btn">
                        <LoadingSpinner title="UNDER MAINTENANCE" loading={loading} color="light" />
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
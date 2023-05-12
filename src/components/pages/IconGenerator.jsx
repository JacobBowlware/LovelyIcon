// React
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Font Awesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

//  Images & Icons
import neonIcon from '../../assets/icons/neonIcon.jpg';
import heartIcon from '../../assets/icons/heartIcon.png';
import coolCarIcon from '../../assets/icons/coolCarIcon.png';
import gorillaIcon from '../../assets/icons/gorillaIcon.png';
import greenIcon from '../../assets/icons/greenIcon.png';
import paintIcon from '../../assets/icons/paintIcon.png';

// Components
import ProgressBar from '../other/ProgressBar';
import { generateImages } from '../../firebase/generateImages';
import LoadingSpinner from '../common/LoadingSpinner';

const testImages = (
    <>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={neonIcon}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={gorillaIcon}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={heartIcon}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={paintIcon}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={coolCarIcon}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={greenIcon}
                alt="Icon created by OpenAI API"
            />
        </div>
    </>
);

const IconGenerator = ({ UID, creditAmount }) => {
    const [iconDetails, setIconDetails] = useState();
    const [generatedIcons, setGeneratedIcons] = useState([]);
    const [userCreditAmount, setUserCreditAmount] = useState(0);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setUserCreditAmount(creditAmount);
    }, [creditAmount]);

    const generateImage = async () => {
        setLoading(true);
        setUserCreditAmount(userCreditAmount - 10);


        // Cloud function will check if user has enough credits to generate image, if not, will return error.
        const imageData = await generateImages(iconDetails, UID);

        if (imageData.error) {
            alert(imageData.error);
            setLoading(false);
            return;
        }

        setGeneratedIcons(imageData.data);
        setLoading(false);
    }

    const handleIconSelect = (icon) => {
        console.log(icon);
        navigate('/icon-generator/step-2', { state: { icon: icon } });
    }


    //TODO:
    // 1. Allow user to select an image to proceed to step 2 -- Edit/Crop image
    return (
        <div className="container page page-padding">
            <ProgressBar />
            <h1 className="header-1 icon-generator__header">Generate Icons</h1>
            <div className="icon-generator__container">
                <p className="p icon-generator__container-p">
                    Enter details on your desired icon design, style, and colors. See our <a href="/icon-generator/step-1/#tips" className="text-highlight text-link">tips for writing clear icon descriptions</a>.
                </p>
                <form className="icon-generator__container__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        generateImage();
                    }}
                >
                    <input
                        maxLength={400}
                        className='form__input icon-generator__container__form-input'
                        type="text"
                        placeholder="blue cactus in the shape of a square, 3D, white background"
                        onChange={(e) => setIconDetails(e.target.value)}
                    />
                    <button
                        disabled={userCreditAmount < 10 || !iconDetails}
                        className="btn btn-primary form__btn icon-generator__container__form-btn">
                        <LoadingSpinner title="GENERATE" loading={loading} color="light" />
                    </button>
                </form>
                <p className="p icon-generator__container-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon-primary" /> You currently have <span className="text-highlight text-semi-bold">{userCreditAmount}</span> credits
                    remaining. Each generate costs <span className="text-highlight text-semi-bold">10</span>. {userCreditAmount < 10 ? <span className="">Add more credits to your
                        account  <Link to="/add-credits" className="text-link text-highlight">here.</Link> </span> : null}
                </p>
            </div>
            <div className="icon-generator__samples">
                <h2 className="header-2 icon-generator__samples-header">
                    {generatedIcons.length > 0 ? "Your Generated Icons; Click on an icon to edit" : "Sample of Generated Icons"}
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
                        testImages
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
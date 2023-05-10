// React
import React, { useState } from 'react';

// Font Awesome & Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import friends from '../../assets/friends.svg';

// Components
import ProgressBar from '../other/ProgressBar';
import { generateImages } from '../../firebase/generateImages';
import LoadingSpinner from '../common/LoadingSpinner';
import { Link } from 'react-router-dom';

const testImages = (
    <>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={friends}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={friends}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={friends}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={friends}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={friends}
                alt="Icon created by OpenAI API"
            />
        </div>
        <div className="icon-generator__icon-display__icon">
            <img className="icon-generator__icon-display__icon-img" src={friends}
                alt="Icon created by OpenAI API"
            />
        </div>
    </>
);

const IconGenerator = ({ UID, creditAmount }) => {
    const [iconDetails, setIconDetails] = useState();
    const [generatedIcons, setGeneratedIcons] = useState();
    const [userCreditAmount, setUserCreditAmount] = useState(creditAmount);

    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        setLoading(true);
        setUserCreditAmount(userCreditAmount - 10);


        // Cloud function will check if user has enough credits to generate image, if not, will return error.
        const imageURL = await generateImages(iconDetails, UID);

        if (imageURL.error) {
            alert(imageURL.error);
            setLoading(false);
            return;
        }

        setGeneratedIcons(imageURL.data);
        setLoading(false);
    }


    //TODO:
    // 2. Check if user has atleast 10 credits to preform generate action - if not, disable button and render warning message below.
    // 3. Display message if user has no credits -- "You have no credits remaining. Add credits to your account here."
    // 4. Allow user to select an image to proceed to step 2 -- Edit/Crop image
    return (
        <div className="container page page-padding">
            <ProgressBar />
            <h1 className="header-1 icon-generator__header">Generate Icons</h1>
            <div className="icon-generator__container">
                <p className="p icon-generator__container-p">
                    Enter details on your desired icon design, style, and colors.
                </p>
                <form className="icon-generator__container__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        generateImage();
                    }}
                >
                    <input
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
                    <FontAwesomeIcon icon={faInfoCircle} className="icon-primary" /> You currently have <span className="text-highlight">{userCreditAmount}</span> credits
                    remaining. Each generate costs <span className="text-highlight">10</span>. To purchase more
                    credits, visit <Link className="link login-form__link" to="/add-credits">Add Credits</Link>
                </p>
            </div>
            <div className="icon-generator__icon-display">
                {generatedIcons ? generatedIcons.map((icon) => {
                    return (
                        <div className="icon-generator__icon-display__icon">
                            <img className="icon-generator__icon-display__icon-img" src={icon.url}
                                alt="Icon created by OpenAI API"
                            />
                        </div>
                    )
                }) : testImages}
            </div>
            <div className="icon-generator__rules-container">
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
                </ul>
            </div>
        </div >
    );
}

export default IconGenerator;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import ProgressBar from '../other/ProgressBar';

const IconGenerator = () => {
    const [iconDetails, setIconDetails] = useState();

    //TODO: 
    // 1. Implement the generate icon functionality
    return (
        <div className="container page page-padding">
            <ProgressBar />
            <h1 className="header-1 icon-generator__header">Generate Icons</h1>
            <div className="icon-generator__container">
                <p className="p icon-generator__container-p">
                    Enter details on your desired icon design, style, and colors.
                </p>
                <form className="icon-generator__container__form">
                    <input
                        className='form__input icon-generator__container__form-input'
                        type="text"
                        placeholder="blue cactus in the shape of a square, 3D, white background"
                        onChange={(e) => setIconDetails(e.target.value)}
                    />
                    <button className="btn btn-primary form__btn icon-generator__container__form-btn">
                        generate
                    </button>
                </form>
                <p className="p icon-generator__container-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon-primary" /> You currently have <span className="text-highlight">0</span> credits
                    remaining. Each generate costs <span className="text-highlight">10</span>.
                </p>
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
        </div>
    );
}

export default IconGenerator;
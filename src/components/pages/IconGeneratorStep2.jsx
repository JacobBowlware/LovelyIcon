import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import ProgressBar from '../other/ProgressBar';

// TODO:
// 1. Render the generated icons from step 1.
// 2. Allow the user to select one of the icons.
// 3. When the user selects an icon, render a popup with the icon and a form to edit the icon.
// 3. Allow the user to edit the icon.

const IconGeneratorStep2 = ({ email, UID }) => {
    const [iconDetails, setIconDetails] = useState();
    const [selectedIcon, setSelectedIcon] = useState();

    return (
        <div className="container page page-padding">
            <ProgressBar step1Complete={true} />
            <h1 className="header-1 icon-generator__header">Edit & Crop</h1>
            <div className="icon-generator__container">
                <p className="p icon-generator__container-p">
                    Preview the icon you selected in the previous step. Edit the icon's colors, size, and more.
                </p>
                <form className="icon-generator__container__form">
                    <input
                        className='form__input icon-generator__container__form-input'
                        type="text"
                        placeholder="change the color to blue, add a shadow, remove the background"
                        onChange={(e) => setIconDetails(e.target.value)}
                    />
                    <button
                        className="btn btn-primary form__btn icon-generator__container__form-btn"
                        disabled={!selectedIcon}
                    >
                        Edit
                    </button>
                </form>
                <p className="p icon-generator__container-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon-primary" /> You currently have <span className="text-highlight">0</span> credits
                    remaining. Each edit costs <span className="text-highlight">10</span>.
                </p>
            </div>
            <div className="icon-generator__icon-display__main">
                <div className="icon-generator__icon-display__icon">
                    {/* Render the selected icon here */}
                </div>
            </div>
        </div>
    );
}

export default IconGeneratorStep2;
// React
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Components
import ProgressBar from '../other/ProgressBar';

const IconGeneratorStep2 = ({ creditAmount, email, UID }) => {
    const [iconEditDetails, setIconEditDetails] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);


    const location = useLocation();

    useEffect(() => {
        setSelectedIcon(location.state ? location.state.icon : null);
    }, [selectedIcon, location.state]);

    const handleEditIcon = (e) => {
        e.preventDefault();
        // Perform the edit action using iconEditDetails and croppedImage
        console.log('Icon Details:', iconEditDetails);
    };


    return (
        <div className="container page page-padding">
            <ProgressBar step1Complete={true} />
            <h1 className="header-1 icon-generator__header">Edit</h1>
            <div className="icon-generator__container">
                <p className="p icon-generator__container-p">
                    Preview the icon you selected. Edit the icon's colors, style, and more.
                </p>
                <form className="icon-generator__container__form" onSubmit={handleEditIcon}>
                    <input
                        className="form__input icon-generator__container__form-input"
                        type="text"
                        placeholder="Change the color to blue, add a shadow, remove the background"
                        value={iconEditDetails}
                        onChange={(e) => setIconEditDetails(e.target.value)}
                    />
                    <button className="btn btn-primary form__btn icon-generator__container__form-btn" disabled={!selectedIcon}>
                        Edit
                    </button>
                </form>
                <p className="p icon-generator__container-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon-primary" /> You currently have{' '}
                    <span className="text-highlight text-semi-bold">{creditAmount}</span> credits remaining. Each edit costs{' '}
                    <span className="text-highlight text-semi-bold">10</span>.
                </p>
            </div>
            <div className="icon-generator__icon-display__main">
                {selectedIcon ? (<img src={selectedIcon} alt="Icon" className="icon-generator__icon-display__main-img" />
                ) : <h2 className="icon-generator__icon-display__main-helper">Please select an icon to edit from your
                    <Link to="/icons" className="link text-highlight"> Icons Page </Link>
                    or <Link to="/icon-generator/step-1/" className="link text-highlight">Generate some new ones</Link>.
                </h2>}
                {/*  Insert example image here of editing an icon 'Make it blue' or something */}
            </div>
        </div>

    );
};

export default IconGeneratorStep2;

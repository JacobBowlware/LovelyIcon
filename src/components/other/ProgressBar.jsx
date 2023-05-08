import { faCloud, faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';


const ProgressBar = ({ step1Complete, step2Complete, step3Complete }) => {
    return (
        <div className="container progress-container">
            <ul className="progressbar">
                <li className={step1Complete ? 'active' : ''}>Generate Icons</li>
                <li className={step2Complete ? 'active' : ''}>Edit & Crop</li>
                <li className={step3Complete ? 'active' : ''}>Download</li>
            </ul>
        </div>
    );
}

export default ProgressBar;
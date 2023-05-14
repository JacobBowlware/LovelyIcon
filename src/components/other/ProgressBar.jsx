import React from 'react';

/* Deprecated due to step refactor - for now */
const ProgressBar = ({ step1Complete, step2Complete, step3Complete }) => {
    return (
        <div className="container progress-container">
            <ul className="progressbar">
                <li className={step1Complete ? 'active' : ''}>Generate Icons</li>
                <li className={step2Complete ? 'active' : ''}>Edit</li>
                <li className={step3Complete ? 'active' : ''}>Crop & Download</li>
            </ul>
        </div>
    );
}

export default ProgressBar;
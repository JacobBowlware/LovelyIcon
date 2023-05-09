import React from 'react';

import ProgressBar from '../other/ProgressBar';

//TODO:
// 1. Render the selected/edited icon from step 2.
// 2. Allow the user to download the icon.

const IconGeneratorStep3 = ({ image }) => {
    return (
        <div className="container page page-padding">
            <ProgressBar step1Complete={true} step2Complete={true} />
            <h1 className="header-1 icon-generator__header">Download</h1>
        </div>
    );
}

export default IconGeneratorStep3;
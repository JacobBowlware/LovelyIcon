import React, { Component } from 'react';

import ProgressBar from '../other/ProgressBar';

const IconGeneratorStep3 = () => {
    return (
        <div className="container page page-padding">
            <ProgressBar step1Complete={true} step2Complete={true} />
            <h1 className="header-1 icon-generator__header">Download</h1>
        </div>
    );
}

export default IconGeneratorStep3;
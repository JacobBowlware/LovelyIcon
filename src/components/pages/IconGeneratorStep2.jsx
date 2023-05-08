import React, { Component } from 'react';
import ProgressBar from '../other/ProgressBar';

const IconGeneratorStep2 = ({ email, UID }) => {
    return (
        <div className="container page page-padding">
            <ProgressBar step1Complete={true} />
            <h1 className="header-1 icon-generator__header">Edit & Crop</h1>
        </div>
    );
}

export default IconGeneratorStep2;
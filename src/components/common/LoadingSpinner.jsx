import React from 'react';

import loadingLight from '../../assets/loadingLight.gif';
import loadingPrimary from '../../assets/loadingPrimary.gif';

const LoadingSpinner = ({ loading, title, color }) => {
    const loadingGif = color === 'light' ? loadingLight : loadingPrimary;
    return (
        <div>
            {loading ? <img className="loading-spinner" src={loadingGif} alt="loading spinner" /> : title}
        </div>
    );
}

export default LoadingSpinner;
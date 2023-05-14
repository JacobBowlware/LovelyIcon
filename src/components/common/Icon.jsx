import React from 'react';

const Icon = ({ image }) => {
    return (
        <div className="icon">
            <img alt="" className="img icon__img" src={image} />
        </div>
    );
}

export default Icon;

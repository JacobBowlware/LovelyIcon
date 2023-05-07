import React from 'react';
import { Link } from 'react-router-dom';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PricingCard = ({ price, title, listItems }) => {
    return (
        <div className="pricing-card">
            <h2 className="header-3 text-secondary-c pricing-card__header">
                {title} <span className="pricing-card__price"> - {price}</span>
            </h2>
            <ul className="list pricing-card__list">
                {listItems.map((item, index) => {
                    return (
                        <li className="list-item pricing-card__list-item" key={index}>
                            <FontAwesomeIcon icon={faCheckCircle} className="pricing-card__list-icon" />{item}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default PricingCard;
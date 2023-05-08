import React from 'react';
import { Link } from 'react-router-dom';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//TODO:
// Implement top right corner badge displaying the % discount
const PricingCard = ({ price, title, listItems, onAdd, creditAmount }) => {
    let containerClassName = "pricing-card";

    if (onAdd) {
        containerClassName += " pricing-card--add";
    }

    return (
        <div className={containerClassName}>
            <div>
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
            {onAdd ? <button className="btn btn--primary pricing-card__add-btn" onClick={onAdd}>Add {creditAmount} Credits</button> : null}
        </div>
    );
}

export default PricingCard;
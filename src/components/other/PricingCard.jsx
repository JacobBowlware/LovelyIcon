import React from 'react';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from '../common/LoadingSpinner';

//TODO:
// Implement top right corner badge displaying the % discount
const PricingCard = ({ price, title, listItems, purchasable, creditAmount, badge, loading = false }) => {

    let containerClassName = "pricing-card";

    if (purchasable) {
        containerClassName += " pricing-card--add";
    }

    const purchasableHandler = (e) => {
        console.log(loading);
        purchasable();
        console.log(loading);
    }

    return (
        <div className={containerClassName}>
            <div className="pricing-card__body">
                <div className="pricing-card__body-text">
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
                {purchasable ? <button className="btn btn--primary pricing-card__add-btn" onClick={() => purchasableHandler()}>
                    <LoadingSpinner title={"Add " + creditAmount + " Credits"} loading={loading} color="light" />
                </button> : null}
            </div>
            <div className="pricing-card__badge">
                <img alt="" className="img" src={badge} />
            </div>
        </div>
    );
}

export default PricingCard;
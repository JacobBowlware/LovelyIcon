import React from 'react';
import { Link } from 'react-router-dom';

import starFighter from '../../assets/icons/starFighter.png';


const PaymentFailure = () => {
    return (
        <div className="container page page-padding">
            <div className="payment__container">
                <div className="payment__container-item">
                    <h1 className="payment-header">Payment Failed</h1>
                    <p className="payment-body">We're sorry, but there was an issue processing your payment. Your transaction could not be completed at this time.</p>
                    <p className="payment-body">If you believe this is an error or have any questions, please don't hesitate to reach out to our support team. We're here to assist you and help resolve any issues.</p>
                    <p className="payment-body">We apologize for any inconvenience caused and appreciate your understanding.</p>
                    <p className="payment-body">Thank you.</p>
                    <a href="mailto:jacobbowlware@gmail.com?subject=Contact%20LovelyIcon" className="btn btn-primary payment__container-link">Contact Support</a>
                    <Link to="/" className="btn btn-primary payment__container-link">Return Home</Link>
                </div>
                <div className="payment__container-item">
                    <img alt="" className="payment__container-img" src={starFighter} />
                </div>
            </div>
        </div>
    );
}

export default PaymentFailure;
import React from 'react';
import { Link } from 'react-router-dom';

import wizard from '../../assets/icons/wizard.png';

const PaymentSuccess = () => {
    return (
        <div className="container page page-padding">
            <div className="payment__container">
                <div className="payment__container-item">
                    <h1 className="payment-header">
                        Payment Successful!
                    </h1>
                    <p className="payment-body">
                        Thank you for your purchase. Your payment has been successfully processed, and your credits have been added to your account. You can now start generating icons and enjoying our services!
                    </p>
                    <p className="payment-body">
                        If you have any questions or need further assistance, please don't hesitate to contact our support team.
                    </p>
                    <p className="payment-body">
                        Happy icon creating!
                    </p>
                    <Link to="/icon-generator/" className="btn btn-primary payment__container-link">Generate Icons</Link>
                </div>
                <div className="payment__container-item">
                    <img alt="" className="payment__container-img" src={wizard} />
                </div>
            </div>
        </div >
    );
}

export default PaymentSuccess;
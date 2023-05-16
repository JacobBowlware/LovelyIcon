// React
import React, { useEffect } from 'react';

// Components
import PricingCard from '../other/PricingCard';
import TextHighlight from '../common/TextHighlight';

// Images
import neonIcon from '../../assets/icons/neonIcon.jpg';
import gorillaIcon from '../../assets/icons/gorillaIcon.png';
import swordIcon from '../../assets/icons/swordIcon.png';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_live_51N83F6CqwoHDTnquXxKM7dOFeAfkurvKRYYpvScwQXgWFvufj5RbXj46wPHv2I2N3rjtQCiW1iGDsm6grPafTULZ00DlS86zvY');

const AddCredits = ({ creditAmount, UID }) => {
    const credit50TestPrice_id = 'prod_NuLyYx1K1t7ISj';
    const credit50Price_id = 'price_1N83TACqwoHDTnquZo9sZgB6';
    const credit110Price_id = 'price_1N83Y8CqwoHDTnquCtMvvqrF';
    const credit240Price_id = 'price_1N83bFCqwoHDTnquI1Xu3JJ0';


    const handlePurchase = async (price_id) => {
        try {
            const response = await axios.post(
                'https://us-central1-lovelyicon-f3ad1.cloudfunctions.net/createCheckoutSession',
                {
                    userId: UID,
                    priceId: price_id,
                }
            );
            console.log(response);

            const data = response.data;

            if (data.sessionId) {
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                    sessionId: data.sessionId,
                });

                if (error) {
                    console.error('Redirect to checkout failed:', error);
                    return;
                }

                // Listen for the redirect event
                window.addEventListener('popstate', () => {

                    console.log('Payment complete!');
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div className="container page">
            <h1 className="header-1 add-credits__header">
                <TextHighlight>Boost Your Account with Credits:</TextHighlight> Flexible Options for Icon Creation
            </h1>
            <div className="pricing__container">
                <div className="grid-item">
                    <PricingCard
                        title="50 Credits"
                        creditAmount={50}
                        price="$5"
                        listItems={
                            [
                                "Generate up to 30 icons",
                                "6 icon designs to choose from",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        purchasable={() => handlePurchase(credit50TestPrice_id)}
                        badge={neonIcon}
                    />
                </div>
                <div className="grid-item">
                    <PricingCard
                        title="110 Credits"
                        creditAmount={110}
                        price="$10"
                        listItems={
                            [
                                "10% more credits",
                                "Generate up to 66 icons",
                                "6 icon designs to choose from",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        purchasable={() => handlePurchase(credit110Price_id)}
                        badge={gorillaIcon}
                    />
                </div>
                <div className="grid-item">
                    <PricingCard
                        title="240 Credits"
                        creditAmount={240}
                        price="$20"
                        listItems={
                            [
                                "20% more credits",
                                "Generate up to 144 icons",
                                "6 icon designs to choose from",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        purchasable={() => handlePurchase(credit240Price_id)}
                        badge={swordIcon}
                    />
                </div>
            </div>
            <p className="add-credits__p">
                Note: Credits are non-refundable and do not expire. You can use them to generate icons at any time.
            </p>
        </div>
    );
}

export default AddCredits;
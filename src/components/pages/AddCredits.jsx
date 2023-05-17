// React
import React, { useEffect } from 'react';

// Components
import PricingCard from '../other/PricingCard';
import TextHighlight from '../common/TextHighlight';

// Firebase
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider, app } from '../../firebase/config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Images
import neonIcon from '../../assets/icons/neonIcon.jpg';
import gorillaIcon from '../../assets/icons/gorillaIcon.png';
import swordIcon from '../../assets/icons/swordIcon.png';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51N83F6CqwoHDTnquo7Vzi3RtSQj3hhsHy6jSP7pCfh9xcDoF7I8TnLSxxofrgtTaAZU9Cfe1i1dtQrxAiT0wMzLQ00rd0Z7wQq');

const AddCredits = ({ creditAmount, UID }) => {
    const credit50TestPrice_id = 'price_1N8XGXCqwoHDTnquOssepIRu';
    const credit50Price_id = 'price_1N83TACqwoHDTnquZo9sZgB6';
    const credit110Price_id = 'price_1N83Y8CqwoHDTnquCtMvvqrF';
    const credit240Price_id = 'price_1N83bFCqwoHDTnquI1Xu3JJ0';


    const handlePurchase = async (price_id, creditAmount) => {
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
                        purchasable={() => handlePurchase(credit50TestPrice_id, 50)}
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
                        purchasable={() => handlePurchase(credit110Price_id, 110)}
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
                        purchasable={() => handlePurchase(credit240Price_id, 240)}
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
// React
import React from 'react';

// Components
import PricingCard from '../other/PricingCard';
import TextHighlight from '../common/TextHighlight';

// Images
import credit1Icon from '../../assets/icons/credit1Icon.png';
import credit2Icon from '../../assets/icons/credit2Icon.png';
import credit3Icon from '../../assets/icons/credit3Icon.png';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_live_51N83F6CqwoHDTnquXxKM7dOFeAfkurvKRYYpvScwQXgWFvufj5RbXj46wPHv2I2N3rjtQCiW1iGDsm6grPafTULZ00DlS86zvY');

const AddCredits = ({ creditAmount, UID }) => {
    const [credit50Loading, setCredit50Loading] = React.useState(false);
    const [credit110Loading, setCredit110Loading] = React.useState(false);
    const [credit240Loading, setCredit240Loading] = React.useState(false);

    // const credit50TestPrice_id = 'price_1N8XGXCqwoHDTnquOssepIRu';
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
                                "Generate up to 60 icons",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        purchasable={() => {
                            setCredit50Loading(true);
                            handlePurchase(credit50Price_id);
                            setTimeout(() => {
                                setCredit50Loading(false);
                            }, 2000);
                        }}
                        badge={credit1Icon}
                        loading={credit50Loading}
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
                                "Generate up to 132 icons",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        purchasable={() => {
                            setCredit110Loading(true);
                            handlePurchase(credit110Price_id);
                            setTimeout(() => {
                                setCredit110Loading(false);
                            }, 2000);
                        }}
                        loading={credit110Loading}
                        badge={credit2Icon}
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
                                "Generate up to 288 icons",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        purchasable={() => {
                            setCredit240Loading(true);
                            handlePurchase(credit240Price_id);
                            setTimeout(() => {
                                setCredit240Loading(false);
                            }, 2000);
                        }}
                        badge={credit3Icon}
                        loading={credit240Loading}
                    />
                </div>
            </div>
            <p className="add-credits__p">
                <span className="text-highlight text-semi-bold">Each icon generation costs 5 credits.</span> Credits are non-refundable and do not expire. You can use them to generate icons at any time.
            </p>
        </div>
    );
}

export default AddCredits;
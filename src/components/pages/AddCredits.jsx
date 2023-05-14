// React
import React from 'react';

// Components
import PricingCard from '../other/PricingCard';
import TextHighlight from '../common/TextHighlight';

// Images
import neonIcon from '../../assets/icons/neonIcon.jpg';
import gorillaIcon from '../../assets/icons/gorillaIcon.png';
import swordIcon from '../../assets/icons/swordIcon.png';

const AddCredits = ({ creditAmount }) => {
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
                        purchasable={() => console.log("Add 50 credits")}
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
                        purchasable={() => console.log("Add 120 credits")}
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
                        purchasable={() => console.log("Add 250 credits")}
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
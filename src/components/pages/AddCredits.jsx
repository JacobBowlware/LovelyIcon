import React from 'react';

// Components
import PricingCard from '../other/PricingCard';

const AddCredits = () => {
    return (
        <div className="container page">
            <h1 className="header-1 add-credits__header">
                Add Credits to Your Account
            </h1>
            <div className="pricing__container">
                <div className="grid-item">
                    <PricingCard
                        title="50 Credits"
                        creditAmount={50}
                        price="$5"
                        listItems={
                            [
                                "Generate up to 5 icons",
                                "Access to all customization options",
                                "6 icon designs to choose from",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        onAdd={() => console.log("Add 50 credits")}
                    />
                </div>
                <div className="grid-item">
                    <PricingCard
                        title="120 Credits"
                        creditAmount={120}
                        price="$10"
                        listItems={
                            [
                                "Generate up to 12 icons",
                                "Access to all customization options",
                                "6 icon designs to choose from",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        onAdd={() => console.log("Add 120 credits")}
                    />
                </div>
                <div className="grid-item">
                    <PricingCard
                        title="300 Credits"
                        creditAmount={300}
                        price="$25"
                        listItems={
                            [
                                "Generate up to 30 icons",
                                "Access to all customization options",
                                "6 icon designs to choose from",
                                "High quality PNG file downloads",
                                "Commercial use"
                            ]
                        }
                        onAdd={() => console.log("Add 300 credits")}
                    />
                </div>
            </div>
            <p>
                Note: Credits are non-refundable and do not expire. You can use them to generate icons at any time.
            </p>
        </div>
    );
}

export default AddCredits;
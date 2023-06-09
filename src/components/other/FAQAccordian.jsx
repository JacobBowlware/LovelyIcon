import React, { useState } from 'react';

import AccordianItem from './AccordianItem';

const FAQAccordian = () => {

    const [acc1Open, setAcc1Open] = useState(false);
    const [acc2Open, setAcc2Open] = useState(false);
    const [acc3Open, setAcc3Open] = useState(false);
    const [acc4Open, setAcc4Open] = useState(false);
    const [acc5Open, setAcc5Open] = useState(false);
    return (
        <div className="faq-accordian__container">
            <AccordianItem
                title="How many icons can I create?"
                content="You can create as many icons as you want! Each icon generation session costs 5 credits, and you'll receive a set of 6 unique icons."
                onPress={() => setAcc1Open(!acc1Open)}
                isOpen={acc1Open}
            />
            <AccordianItem
                title="Are the icons customizable?"
                content="Yes! These icons are fully customizable and created with your input. Our icon 
                generator allows you to choose from a variety of options to create the perfect icon for your needs."
                onPress={() => setAcc2Open(!acc2Open)}
                isOpen={acc2Open}
            />
            <AccordianItem
                title="How do I download the icons I create?"
                content="After creating your icon, you can download it as a PNG file by going to the 'Icons' page and clicking on the icon you want to download."
                onPress={() => setAcc3Open(!acc3Open)}
                isOpen={acc3Open}
            />
            <AccordianItem
                title="Can I use the icons for commercial purposes?"
                content="Yes! You can use the icons for commercial, personal, or any other purpose."
                onPress={() => setAcc4Open(!acc4Open)}
                isOpen={acc4Open}
            />
            <AccordianItem
                title="How do I claim my free credits?"
                content="In order to claim your free credits, you must verify your email address. You can do this by going to the 'Profile' page and clicking on the 'Verify Email' button."
                onPress={() => setAcc5Open(!acc5Open)}
                isOpen={acc5Open}
            />
        </div>
    );
}

export default FAQAccordian;
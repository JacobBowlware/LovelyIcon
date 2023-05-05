import React, { useState } from 'react';

import AccordianItem from '../common/AccordianItem';

const FAQAccordian = () => {

    const [acc1Open, setAcc1Open] = useState(false);
    const [acc2Open, setAcc2Open] = useState(false);
    const [acc3Open, setAcc3Open] = useState(false);
    const [acc4Open, setAcc4Open] = useState(false);
    return (
        <div className="faq-accordian__container">
            <AccordianItem
                title="How many icons can I create?"
                content="You can create as many icons as you want! Each icon you create will require 10 credits and your input for customizations."
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
                content="After creating and customizing your icon, you can download it as a PNG file via the 'download' button."
                onPress={() => setAcc3Open(!acc3Open)}
                isOpen={acc3Open}
            />
            <AccordianItem
                title="Can I use the icons for commercial purposes?"
                content="Yes! You can use the icons for commercial, personal, or any other purpose."
                onPress={() => setAcc4Open(!acc4Open)}
                isOpen={acc4Open}
            />
        </div>
    );
}

export default FAQAccordian;
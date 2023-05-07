import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


//TODO: Add chevron icon to the right of the title
const AccordianItem = ({ title, content, onPress, isOpen, onAdd }) => {
    return (
        <div className="accordian-item">
            <div className="accordian-item-header" onClick={onPress}>
                <h3 className="header-3 accordian-item__header">{title}</h3>
                <FontAwesomeIcon className="icon accordian-item__icon" icon={isOpen ? faChevronUp : faChevronDown} />
            </div>
            {
                isOpen && <div className="accordian-item-content">
                    <p className="p accordian-item-p">
                        {content}
                    </p>
                </div>
            }
        </div>
    );
}

export default AccordianItem;
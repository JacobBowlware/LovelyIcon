// React
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import TextHighlight from '../common/TextHighlight';

const IconDownload = ({ image }) => {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        try {
            setSelectedIcon(location.state.icon);
        }
        catch (err) {
            navigate('/icon-generator/');
        }
    }, [location.state.icon]);

    const handleDownload = () => {
        if (selectedIcon) {
            const link = document.createElement('a');
            link.href = selectedIcon;
            link.download = 'icon.png';
            link.click();
        }
    }

    return (
        <div className="container page page-padding">
            <div className="icon-download__container">
                <div className="icon-download__container-item">
                    <h1 className="header-1 icon-download__header">Download Your Icon</h1>
                    <p className="p icon-generator__container-p">
                        Click the <TextHighlight>'Download Icon'</TextHighlight> button to
                        download your icon as a 512px by 512px PNG file.
                    </p>
                    <button className="btn btn-primary icon-download__btn" onClick={() => handleDownload()}>
                        Download Icon
                    </button>
                </div>
                <div className="icon-download__container-item">
                    <img className="icon-download__img" src={selectedIcon} />
                </div>
            </div>
        </div>
    );
}

export default IconDownload;
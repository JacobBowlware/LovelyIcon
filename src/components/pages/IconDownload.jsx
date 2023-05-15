// React
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import TextHighlight from '../common/TextHighlight';

const IconDownload = ({ image, isB64 }) => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isB64Image, setIsB64Image] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        try {
            setSelectedIcon(location.state.icon);
            setIsB64Image(location.state.isB64);
            console.log(selectedIcon);
            console.log(isB64Image);
        }
        catch (err) {
            navigate('/icon-generator/');
        }
    }, [location.state.icon, location.state.isB64, navigate]);

    const handleDownload = () => {
        if (selectedIcon && !isB64Image) {
            const link = document.createElement('a');
            link.href = selectedIcon;
            link.download = 'icon.png';
            link.click();
        }
        else if (selectedIcon && isB64Image) {
            const link = document.createElement('a');
            link.href = `data:image/png;base64,${selectedIcon.b64_json}`;
            link.download = 'icon.png';
            link.click();
        }
    }

    console.log(selectedIcon);

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
                    <img alt="" className="icon-download__img" src={isB64Image ? `data:image/png;base64,${selectedIcon.b64_json}` : selectedIcon} />
                </div>
            </div>
        </div>
    );
}

export default IconDownload;
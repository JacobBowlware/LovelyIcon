// React
import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// React Easy Crop
import Cropper from 'react-easy-crop';

//TODO:
// 1. Render the selected icon
// 2. Allow the user to download the icon.

const IconDownload = ({ image }) => {
    const [cropActive, setCropActive] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);

    const location = useLocation();

    useEffect(() => {
        setSelectedIcon(location.state.icon);
    }, [location.state.icon]);

    // React Easy Crop State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])



    return (
        <div className="container page page-padding">
            <h1 className="header-1 icon-generator__header">Crop & Download Your Icon</h1>
            <p className="p icon-generator__container-p">
                Crop your icon to your liking, then download it!
            </p>
            <img src={selectedIcon} />
            {cropActive && <div className="icon-generator__icon-display__crop">
                <div className="icon-generator__icon-display__cropper">
                    <Cropper
                        image={selectedIcon}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                    <div className="controls">
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                                setZoom(e.target.value)
                            }}
                            className="zoom-range"
                        />
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default IconDownload;
// React
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Firebase
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

// Components
import TextHighlight from '../common/TextHighlight';


//TODO:
// 3. When icon is clicked, take them to step-2 with the icon selected.
// 4. If user has no icons, display a message saying "You have no icons yet. Click here to generate one."
// 5. Add a button: 'Select Icons to Delete' -> When clicked, user can select icons to delete.
const MyIcons = ({ UID }) => {
    const [imageUrls, setImageUrls] = useState([]);

    const navigate = useNavigate();

    // Get all icons from the database
    const data = useLoaderData();


    useEffect(() => {
        setImageUrls(data);
    }, [UID, data]);



    return (
        <div className="page page-padding">
            <div className="my-icons__header-container">
                <div className="my-icons__text">
                    <h1 className="header-1 my-icons__header">Generated Icons</h1>
                    <p className="p my-icons__desc">
                        Explore and manage your generated icons.
                        <TextHighlight> Click on an icon to edit it. </TextHighlight> To
                        <TextHighlight> delete</TextHighlight> icons, simply select the ones you wish to remove
                        using the <TextHighlight>'Select Icons to Delete'</TextHighlight> button.
                    </p>
                </div>
                <div className="my-icons__operations">
                    <button className="btn btn-primary my-icons__operations-btn">Select Icons to Delete</button>
                    <button onClick={() => navigate('/icon-generator/step-1/')} className="btn btn-primary my-icons__operations-btn">Generate More Icons</button>
                </div>
            </div>
            <div className="grid my-icons__container">
                {imageUrls.map((url, index) => {
                    return (
                        <div className="my-icons__item" key={index}>
                            <img className="my-icons__icon" src={url} alt="icon" />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MyIcons;

const MyIconsLoader = async (UID) => {
    try {
        const storage = getStorage();
        const iconsRef = ref(storage, `users/${UID}/icons`);

        const iconsSnapshot = await listAll(iconsRef);

        const urls = await Promise.all(
            iconsSnapshot.items.map(async (item) => {
                return getDownloadURL(item);
            })
        );

        return urls;
    } catch (error) {
        alert(error);
        return [];
    }
};


export { MyIconsLoader };

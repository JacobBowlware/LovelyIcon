// React
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Firebase
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

// Components
import TextHighlight from '../common/TextHighlight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

const storage = getStorage();


//TODO:
// 3. When icon is clicked, take them to step-2 with the icon selected.
// 4. If user has no icons, display a message saying "You have no icons yet. Click here to generate one."
// 5. Add a button: 'Select Icons to Delete' -> When clicked, user can select icons to delete.
const MyIcons = ({ UID }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [imageRefs, setImageRefs] = useState([]);

    const [iconClassName, setIconClassName] = useState('my-icons__icon');
    const [selectedIconIndex, setSelectedIconIndex] = useState(null);

    const navigate = useNavigate();
    const data = useLoaderData();

    useEffect(() => {
        setImageUrls(data.urls);
        setImageRefs(data.refs);
    }, [UID, data]);

    const handleIconSelect = (index) => {
        if (iconClassName === 'my-icons__icon my-icons__icon--shade') {
            if (index === selectedIconIndex) {
                const deleteRef = imageRefs[index];
                deleteObject(deleteRef).then(() => {

                    const newImageUrls = imageUrls.filter((url, i) => i !== index);
                    setImageUrls(newImageUrls);

                    const newImageRefs = imageRefs.filter((ref, i) => i !== index);
                    setImageRefs(newImageRefs);

                    setSelectedIconIndex(null);
                }
                ).catch((error) => {
                    alert(error);
                });
            }
            else {
                setSelectedIconIndex(index);
            }
        }
    }

    return (
        <div className="page page-padding">
            <div className="my-icons__header-container">
                <div className="my-icons__text">
                    <h1 className="header-1 my-icons__header">Generated Icons</h1>
                    <p className="p my-icons__desc">
                        Explore and manage your generated icons.
                        <TextHighlight> Click on an icon to edit it. </TextHighlight> To
                        <TextHighlight> delete</TextHighlight> icons, simply press the <TextHighlight>'Delete Icons'</TextHighlight> button
                        and click on the icons you want to delete. Keep in mind that once you delete an icon, it cannot be recovered.
                    </p>
                </div>
                <div className="my-icons__operations">
                    <button onClick={() => navigate('/icon-generator/step-1/')} className="btn btn-primary my-icons__operations-btn">Generate More Icons</button>
                    {iconClassName === 'my-icons__icon' ?
                        <button onClick={() => setIconClassName('my-icons__icon my-icons__icon--shade')} className="btn btn-primary my-icons__operations-btn">
                            Delete Icons
                        </button> : <button onClick={() => {
                            setIconClassName('my-icons__icon');
                            setSelectedIconIndex(null);
                        }}
                            className="btn btn-secondary my-icons__operations-btn">Cancel Deletion</button>}
                </div>
            </div>
            <div className="grid my-icons__container">
                {imageUrls.map((url, index) => {
                    const isSelected = selectedIconIndex === index;
                    return (
                        <>
                            <div className={iconClassName} key={index} onClick={() => handleIconSelect(index)}>
                                <img className="my-icons__icon" src={url} alt="icon" />
                                {iconClassName === 'my-icons__icon my-icons__icon--shade' && <div className="my-icons__icon-overlay">
                                    {isSelected ? <FontAwesomeIcon className="my-icons__icon-trash" icon={faXmark} /> : <FontAwesomeIcon className="my-icons__icon-trash" icon={faTrash} />}
                                </div>}
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    );
}

export default MyIcons;

const MyIconsLoader = async (UID) => {
    try {
        const iconsRef = ref(storage, `users/${UID}/icons`);
        const iconsSnapshot = await listAll(iconsRef);

        const refs = [];
        const urls = await Promise.all(
            iconsSnapshot.items.map(async (item) => {
                refs.push(item);
                return getDownloadURL(item);
            })
        );

        return { urls, refs };
    } catch (error) {
        alert(error);
        return [];
    }
};

export { MyIconsLoader };
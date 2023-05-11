import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { app } from '../../firebase/config';


const db = getFirestore(app);

//TODO:
// 1. Get all icons from the database
// 2. Display them in a grid
// 3. When icon is clicked, take them to step-2 with the icon selected.
const MyIcons = ({ UID }) => {
    const [userIcons, setUserIcons] = useState([]);

    // Get all icons from the database
    const data = useLoaderData();


    useEffect(() => {
        setUserIcons(data.flat());
    }, [data])


    console.log(userIcons)
    // useEffect(() => {
    //     console.log(window.innerWidth)
    //     setUserIcons(data);
    // }, [userIcons, data])

    return (
        <div className="page page-padding">
            <h1 className="header-1">Your Icons</h1>
            <div className="grid my-icons__container">
                {userIcons.map((icon, index) => {
                    const imageSrc = `data:image/jpeg;base64,${icon.image}`;

                    return (
                        <div className="my-icons__item" key={index}>
                            <img className="my-icons__icon" src={imageSrc} alt="icon" />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MyIcons;

const MyIconsLoader = async (UID) => {
    let userIcons = [];
    // Get all icons from the firebase storage and return them

};

export { MyIconsLoader };

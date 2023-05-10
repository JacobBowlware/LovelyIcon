import axios from 'axios';

import firebase from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { app } from '../firebase/config.js'

// Initialize Firebase
const db = getFirestore(app);

const generateImages = async (prompt, UID) => {
    const response = await axios.post('https://us-central1-lovelyicon-f3ad1.cloudfunctions.net/generateImage', {
        prompt: prompt,
    });

    console.log(response.data);
    const images = await response.data; // [ {url: ...}, {url: ...}, {url: ...} ]

    // Store the generated images in the user's firebase storage
    await addDoc(collection(db, "users", UID, "icons"), {
        images: images,
    });

    return images;
};

export { generateImages };

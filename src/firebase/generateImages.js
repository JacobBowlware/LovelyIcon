import axios from 'axios';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/config.js';

// Initialize Firebase
const db = getFirestore(app);
const storage = getStorage(app);

const generateImages = async (prompt, UID) => {
    try {
        const response = await axios.post(
            'https://us-central1-lovelyicon-f3ad1.cloudfunctions.net/generateImage',
            {
                prompt: prompt,
                userId: UID,
            }
        );

        const images = response.data; // [{b64_json: 'base64'}, {b64_json: 'base64'}]

        try {
            for (let i = 0; i < images.data.length; i++) {
                const base64Data = images.data[i].b64_json;
                const blob = b64toBlob(base64Data, 'image/png'); // Convert base64 to Blob

                // Generate a unique filename using a combination of user ID, random string, and timestamp
                const timestamp = Date.now();
                const randomString = generateRandomString(8);
                const filename = `${UID}_${randomString}_${timestamp}_${i}.png`;

                // Upload the file to Firebase Storage
                const storageRef = ref(storage, `users/${UID}/icons/${filename}`);
                const snapshot = await uploadString(storageRef, base64Data, 'base64');

                // Get the download URL of the uploaded file
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Save the download URL in the Firestore document
                const docRef = await addDoc(collection(db, 'users', UID, 'icons'), {
                    image: downloadURL,
                });
            }
        } catch (e) {
            return images;
        }

        return images;
    } catch (e) {
        return null;
    }
};

function b64toBlob(base64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export { generateImages };

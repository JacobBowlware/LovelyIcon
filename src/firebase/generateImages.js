// Axios
import axios from 'axios';

// Firebase
import { getStorage, ref, uploadString } from 'firebase/storage';
import { app } from '../firebase/config.js';

// Mask
import mask from '../assets/mask.png';

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
                const fileName = `${UID}_${Date.now()}_${i}.png`;

                const storageRef = ref(storage, `users/${UID}/icons/${fileName}`);
                await uploadString(storageRef, base64Data, 'base64');
            }
        } catch (e) {
            return images;
        }

        return images;
    } catch (e) {
        return null;
    }
};

/* editImages process is deprecated, however may be used in the future */
// const editImages = async (prompt, UID, image) => {
//     try {
//         const response = await axios.post('https://us-central1-lovelyicon-f3ad1.cloudfunctions.net/editImages', {
//             userId: UID,
//             prompt: prompt,
//             image: image,
//             mask: mask
//         });

//         console.log(response);
//         const editedImage = response.data.data[0];
//         try {
//             const base64Data = editedImage.b64_json;
//             const fileName = `${UID}_${Date.now()}.png`; 

//             const storageRef = ref(storage, `users/${UID}/icons/${fileName}`);
//             await uploadString(storageRef, base64Data, 'base64');

//             return editedImage;
//         } catch (e) {
//             console.log("Error in editImages: where we upload the image to Firebase storage " + e);
//             return response.data.data[0];
//         }
//     } catch (e) {
//         console.log("Error in editImages: where we call the cloud function  " + e);
//         return null;
//     }
// };

// export { generateImages, editImages };
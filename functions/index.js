const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.generateImage = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://lovelyicon-f3ad1.web.app');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    const userId = req.body.userId;
    const prompt = req.body.prompt;

    try {
        const userDocRef = admin.firestore().doc(`users/${userId}`);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData.hasOwnProperty('credits') && userData.credits >= 10) {
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${functions.config().openai.key}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: "Generate high-quality square vector art with clean lines, precise details, and a professional look. The artwork should fill the entire image canvas without leaving any white spaces. " + prompt,
                        n: 1,
                        size: "512x512",
                        model: "image-alpha-001",
                        response_format: "b64_json"
                    })
                };

                const fetch = await import('node-fetch');
                const response = await fetch.default('https://api.openai.com/v1/images/generations', options);
                const data = await response.json();

                const credits = userData.credits;
                await userDocRef.update({ credits: credits - 10 });

                res.status(200).send(data);
            } else {
                res.status(403).send('Insufficient credits');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

// Commented out because this edditing method does not really work as intended
// exports.editImages = functions.https.onRequest(async (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'https://lovelyicon-f3ad1.web.app');
//     res.set('Access-Control-Allow-Methods', 'GET, POST');
//     res.set('Access-Control-Allow-Headers', 'Content-Type');

//     if (req.method === 'OPTIONS') {
//         res.status(204).send('');
//         return;
//     }

//     const userId = req.body.userId;
//     const prompt = req.body.prompt;
//     const image = req.body.image;
//     const mask = req.body.mask;

//     console.log("Mask -> " + mask);
//     try {
//         const userDocRef = admin.firestore().doc(`users/${userId}`);
//         const userDoc = await userDocRef.get();

//         if (userDoc.exists) {
//             const userData = userDoc.data();
//             if (userData.hasOwnProperty('credits') && userData.credits >= 10) {
//                 const credits = userData.credits;
//                 const fetch = await import('node-fetch');

//                 const response = await fetch.default(image);
//                 const imageData = await response.arrayBuffer();

//                 const rgbaImageData = await sharp(imageData)
//                     .ensureAlpha() // Ensure the image has an alpha channel (RGBA)
//                     .toFormat('png')
//                     .toBuffer();

//                 const maskResponse = await fetch.default(mask);
//                 const maskData = await maskResponse.arrayBuffer();

//                 const resizedMaskData = await sharp(maskData)
//                     .resize(512, 512)
//                     .toFormat('png')
//                     .toBuffer();

//                 const form = new FormData();
//                 const bufferStream = new Readable();
//                 bufferStream.push(rgbaImageData);
//                 bufferStream.push(null);

//                 const bufferStream2 = new Readable();
//                 bufferStream2.push(resizedMaskData);
//                 bufferStream2.push(null);


//                 form.append('prompt', "Keep the exact same style and look of the icon we are editing, ONLY make the changes to this icon as stated next;" + prompt);
//                 form.append('image', bufferStream, { filename: 'image.png', contentType: 'image/png' });
//                 form.append('mask', bufferStream2, { filename: 'mask.png', contentType: 'image/png' });
//                 form.append('n', '1');
//                 form.append('size', '512x512');
//                 form.append('response_format', 'b64_json');


//                 const options = {
//                     method: 'POST',
//                     headers: {
//                         'Authorization': `Bearer ${functions.config().openai.key}`,
//                         ...form.getHeaders(),
//                     },
//                     body: form,
//                 };

//                 const openAIResponse = await fetch.default('https://api.openai.com/v1/images/edits', options);
//                 const data = await openAIResponse.json();

//                 await userDocRef.update({ credits: credits - 10 });

//                 res.status(200).send(data);
//             } else {
//                 res.status(403).send('Insufficient credits');
//             }
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal server error');
//     }
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Define the Cloud Function
exports.generateImage = functions.https.onRequest(async (req, res) => {
    // Set CORS headers
    res.set('Access-Control-Allow-Origin', 'https://lovelyicon-f3ad1.web.app');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.status(204).send('');
        return;
    }

    // Get the user ID from the request body
    const userId = req.body.userId;
    // Get the prompt from the request body
    const prompt = req.body.prompt;

    try {
        // Retrieve the user's document from the database
        const userDocRef = admin.firestore().doc(`users/${userId}`);
        const userDoc = await userDocRef.get();

        // Check if the user document exists
        if (userDoc.exists) {
            const userData = userDoc.data();
            // Check if the 'credits' property exists and the value is greater than or equal to 10
            if (userData.hasOwnProperty('credits') && userData.credits >= 10) {
                const credits = userData.credits;

                // Deduct 10 credits from the user's current credits
                const updatedCredits = credits - 10;
                // Update the user's credits in the database
                await userDocRef.update({ credits: updatedCredits });

                // Call the OpenAI image generator with the prompt
                const fetch = await import('node-fetch');
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${functions.config().openai.key}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: "Photorealistic style, digital art, " + prompt,
                        n: 1,
                        size: "512x512",
                        model: "image-alpha-001",
                        response_format: "b64_json"
                    })
                };

                const response = await fetch.default('https://api.openai.com/v1/images/generations', options);
                const data = await response.json();
                console.log(data);

                // Return the generated image URL in the response
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

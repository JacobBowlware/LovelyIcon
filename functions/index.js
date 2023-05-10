const functions = require('firebase-functions');



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

    // Get the prompt from the request body
    const prompt = req.body.prompt;

    // Call the OpenAI image generator with the prompt
    const fetch = await import('node-fetch');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${functions.config().openai.key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "512x512",
            model: "image-alpha-001"
        })
    }


    const response = await fetch.default('https://api.openai.com/v1/images/generations', options);
    const data = await response.json();

    // Return the generated image URL in the data
    res.status(200).send(data);
});

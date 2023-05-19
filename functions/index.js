const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { user } = require('firebase-functions/v1/auth');

// const stripe = require('stripe')(functions.config().stripe.secret_key);
// To set config variable 'firebase functions:config:set stripe.endpoint_secret="your_endpoint_secret_here"'
// Test mode secret key
const stripe = require('stripe')('sk_test_51N83F6CqwoHDTnqukpccKadzbxg9Cb2WDTnQbiKqcMdUvB9ZGEaKAFjF1AD4T71TF5Z4tHofanLSVRpaqiMF62XU00EsfaSWUk');
const endpointSecret = functions.config().stripe.endpoint_secret;

admin.initializeApp();

exports.generateImage = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://lovelyicon.com');
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
            if (userData.hasOwnProperty('credits') && userData.credits >= 5) {
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${functions.config().openai.key}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: prompt,
                        n: 3,
                        size: "512x512",
                        model: "image-alpha-001",
                        response_format: "b64_json"
                    })
                };

                const fetch = await import('node-fetch');
                const response = await fetch.default('https://api.openai.com/v1/images/generations', options);
                const data = await response.json();

                const credits = userData.credits;
                await userDocRef.update({ credits: credits - 5 });

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

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://lovelyicon.com');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Verify the user is authenticated
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    const userId = req.body.userId;
    const priceId = req.body.priceId;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://lovelyicon.com/payment-success/',
            cancel_url: 'https://lovelyicon.com/payment-fail/',
            automatic_tax: { enabled: true },
            metadata: {
                userId: userId,
                priceId: priceId,
            },
        });
        res.status(200).send({ sessionId: session.id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        // Fulfill the purchase...
        await fulfillOrder(event.data.object);
    }

    res.status(200).end();
});


const fulfillOrder = async (session) => {
    const userId = session.metadata.userId;
    const priceId = session.metadata.priceId;

    // Update user's credits in the Firestore database
    const userDocRef = admin.firestore().doc(`users/${userId}`);
    const userDoc = await userDocRef.get();

    try {
        const userData = userDoc.data();
        const currentCredits = userData.credits || 0;
        const updatedCredits = currentCredits + getCreditAmountFromPriceId(priceId);

        await userDocRef.update({ credits: updatedCredits });
    } catch (error) {
        console.error('Error:', error);
    }
}

const getCreditAmountFromPriceId = (priceId) => {
    switch (priceId) {
        case 'price_1N8XGXCqwoHDTnquOssepIRu':
            return 50;
        case 'price_1N83TACqwoHDTnquZo9sZgB6':
            return 50;
        case 'price_1N83Y8CqwoHDTnquCtMvvqrF':
            return 110;
        case 'price_1N83bFCqwoHDTnquI1Xu3JJ0':
            return 240;
        default:
            return 0;
    }
}

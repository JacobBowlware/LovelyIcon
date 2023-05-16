const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.secret_key);

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
                        prompt: prompt + ". This image should be a high-quality, square, vector art piece with clean lines, precise details, and a professional look. The artwork should fill the entire image canvas without leaving any white spaces.",
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

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://lovelyicon-f3ad1.web.app');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Verify the user is authenticated
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    const userId = req.body.userId;
    const priceId = req.body.priceId;

    console.log(functions.config().stripe.secret_key);

    console.log("I am here now");

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: priceId,
                    quantity: 1,
                    test: true
                },
            ],
            mode: 'payment',
            success_url: 'https://lovelyicon-f3ad1.web.app/profile/', // Replace with your success URL
            cancel_url: 'https://lovelyicon-f3ad1.web.app/icons/', // Replace with your cancel URL
            automatic_tax: { enabled: true },
        });

        res.status(200).send({ sessionId: session.id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://lovelyicon-f3ad1.web.app');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    switch (req.body.type) {
        case 'checkout.session.async_payment_failed':
            // Handle payment failed event
            console.log("Payment failed")
            break;
        case 'checkout.session.async_payment_succeeded':
            // Handle payment succeeded event
            console.log("Payment succeeded")
            break;
        case 'checkout.session.completed':
            // Handle checkout session completed event
            console.log("Checkout session completed")
            break;
        default:
            console.log(`Unhandled event type: ${req.body.type}`);
    }
});
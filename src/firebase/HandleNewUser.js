import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

const isNewUser = (creationTime) => {
    const now = new Date();
    const creationDate = new Date(creationTime);
    const diff = now - creationDate;

    // If the user was created less than 1 minute ago, they are a new user
    if (diff < 60000) {
        return true;
    }
    return false;
}

const addNewUserCredits = async (UID) => {
    const docRef = doc(db, "users", UID);
    const docSnap = await getDoc(docRef);

    let credits = 0;
    try {
        credits = docSnap.data().credits;
    }
    catch (err) {
        // console.log(err);
        credits = 0;
    }

    await setDoc(doc(db, "users", UID), {
        credits: credits + 5,
        creditsAdded: true
    });
}

const creditsAdded = async (UID) => {
    const docRef = doc(db, "users", UID);
    const docSnap = await getDoc(docRef);
    try {
        if (docSnap.data.creditsAdded === undefined)
            return false;
    }
    catch (err) {
        return false;
    }

    return docSnap.data().creditsAdded;
}

export { isNewUser, addNewUserCredits, creditsAdded };
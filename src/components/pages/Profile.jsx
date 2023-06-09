// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase
import { sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase/config';

// Components
import Logout from '../common/Logout';

const actionCodeSettings = {
    url: 'https://lovelyicon-f3ad1.firebaseapp.com/__/auth/action',
    handleCodeInApp: true,
};

const Profile = ({ email, UID, creditAmount }) => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        Logout(navigate);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email).then(() => {
            alert('Password reset email sent!');
        }).catch((error) => {
            alert(error.message);
        });
    }

    const handleAddCredits = (e) => {
        e.preventDefault();
        navigate('/add-credits/');
    }

    const handleEmailVerification = async (e) => {
        e.preventDefault();
        await sendEmailVerification(auth.currentUser, actionCodeSettings);

        // Redirect to email verification page
        navigate('/email-verification/');
        window.location.reload();
    }


    return (
        <div className="container page">
            <div className="profile__card">
                <h1 className="header-1  profile__card-header">
                    Profile Details
                </h1>
                <div className="profile__card-group">
                    <div className="profile__card-group__first-child">
                        <p className="p profile__card-text">
                            <span className="text-highlight text-semi-bold">Email:</span> {email}
                        </p>
                        <button
                            className="btn btn-primary profile__btn"
                            onClick={(e) => handlePasswordChange(e)} >
                            Change Password
                        </button>
                    </div>
                    <div className="profile__card-group__last-child">
                        <p className="p profile__card-text">
                            <span className="text-highlight text-semi-bold">Total Credits:</span> {creditAmount}
                        </p>
                        <button className="btn btn-primary profile__btn"
                            onClick={(e) => handleAddCredits(e)}>
                            Add Credits
                        </button>
                    </div>
                </div>
                <button
                    className="btn btn-primary profile__btn"
                    onClick={(e) => handleEmailVerification(e)}
                    disabled={auth.currentUser.emailVerified}
                >
                    {auth.currentUser.emailVerified ? 'Email Verified' : 'Verify Email'}
                </button>
                <button
                    className="btn btn-primary profile__btn"
                    onClick={(e) => handleLogout(e)}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
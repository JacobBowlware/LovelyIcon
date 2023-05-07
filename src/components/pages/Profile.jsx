// React
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase
import { sendPasswordResetEmail, signOut, updatePassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

// Components
import TextHighlight from '../common/TextHighlight';

const Profile = ({ email, UID }) => {

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        signOut(auth).then(() => {
            navigate('/login');
            window.location.reload();
        }).catch((error) => {
            alert(error);
        });
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
        navigate('/add-credits');
    }

    return (
        <div className="container profile">
            <div className="profile__card">
                <h1 className="header-1  profile__card-header">
                    Profile Details
                </h1>
                <p className="p profile__card-text">
                    <TextHighlight>Email:</TextHighlight> {email}
                </p>
                <p className="p profile__card-text">
                    <TextHighlight>Available Credits:</TextHighlight> 10
                </p>
                <button
                    className="btn btn-primary logout__btn"
                    onClick={(e) => handlePasswordChange(e)} >
                    Change Password
                </button>
                <button className="btn btn-primary logout__btn"
                    onClick={(e) => handleAddCredits(e)}>
                    Add Credits
                </button>
                <button
                    className="btn btn-primary logout__btn"
                    onClick={(e) => handleLogout(e)}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
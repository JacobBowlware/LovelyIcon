import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

// Custom Components
import TextHighlight from '../common/TextHighlight';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        signOut(auth).then(() => {
            navigate('/login');
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    }

    return (
        <div className="container profile">
            <h1 className="header-1 profile__header">Profile</h1>
            <button
                className="btn btn-primary logout__btn"
                onClick={(e) => handleLogout(e)}
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
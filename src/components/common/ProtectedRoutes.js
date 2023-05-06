import React, { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Signup from '../pages/Signup';

/**
 * Route guard for protected routes.
 * @returns The desired route if the user is logged in, otherwise the login page.
 */
const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();

        const status = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return status;
    }, []);

    return user ? <Outlet /> : <Signup />;
}

export default ProtectedRoutes;
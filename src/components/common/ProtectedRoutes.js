import React from 'react';
import { Outlet } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Signup from '../pages/Signup';

const ProtectedRoutes = () => {
    const auth = getAuth();
    return auth.currentUser ? <Outlet /> : <Signup />;
}

export default ProtectedRoutes;

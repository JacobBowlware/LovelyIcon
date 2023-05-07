// React
import React from 'react';
import {
  Route, RouterProvider, createBrowserRouter,
  createRoutesFromElements, Outlet
} from 'react-router-dom';

// Pages
import Home from './components/pages/Home.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Profile from './components/pages/Profile.jsx';

// Components
import Footer from './components/common/Footer.jsx';
import Header from './components/common/Header.jsx';

// CSS
import './components/css/App.css';
import './components/css/Home.css';
import './components/css/Header.css';
import './components/css/Footer.css';
import './components/css/Profile.css';
import ProtectedRoutes from './components/common/ProtectedRoutes.js';


//TODO: 
// 0. Advance the profile page
// 1. Add a dashboard page
// 2. Add a settings page
// 3. Add a forgot password page
// 4. Implement reset-password email
// 5. Add a 404 page


function App() {
  const Root = () => {
    return <>
      <Header />
      <div className="web-container">
        <Outlet />
      </div>
      <Footer />
    </>
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route index element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

      </Route >
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// React
import React, { useState } from 'react';
import {
  Route, RouterProvider, createBrowserRouter,
  createRoutesFromElements, Outlet
} from 'react-router-dom';

// Firebase
import { auth } from './firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';

// Pages
import Home from './components/pages/Home.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Profile from './components/pages/Profile.jsx';
import IconGenerator from './components/pages/IconGenerator.jsx';
import YourIcons from './components/pages/YourIcons.jsx';
import AddCredits from './components/pages/AddCredits.jsx';

// Data Loaders

// Components
import Footer from './components/common/Footer.jsx';
import Header from './components/common/Header.jsx';
import ProtectedRoutes from './components/common/ProtectedRoutes.js';

// CSS
import './components/css/App.css';
import './components/css/Home.css';
import './components/css/Header.css';
import './components/css/Footer.css';
import './components/css/Profile.css';
import './components/css/IconGenerator.css';
import './components/css/YourIcons.css';
import './components/css/AddCredits.css';
import './components/css/ProgressBar.css'
import IconGeneratorStep2 from './components/pages/IconGeneratorStep2.jsx';
import IconGeneratorStep3 from './components/pages/IconGeneratorStep3.jsx';



//TODO: 
// 1. Implement the icon generator functionality
//    - Look at Dalle API for generating images from user-input
//    - When user clicks "Generate", send the user-input to the Dalle API
//    - When the Dalle API returns the images, send them to the users firebase icon storage (and display them to the user)
//    - When the user selects an image, allow them to edit it
//    - When the user is done editing, allow them to download the image


function App() {
  const [email, setEmail] = useState("");
  const [UID, setUID] = useState("");


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUID(user.uid);
      setEmail(user.email);
    } else {
      // User is signed out
    }
  });

  const Root = () => {
    return <>
      <Header email={email} />
      <div className="web-container">
        <Outlet />
      </div>
      <Footer email={email} />
    </>
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile email={email} UID={UID} />} />
          <Route path="/icon-generator/step-1" element={<IconGenerator email={email} UID={UID} />} />
          <Route path="/icon-generator/step-2" element={<IconGeneratorStep2 email={email} UID={UID} />} />
          <Route path="/icon-generator/step-3" element={<IconGeneratorStep3 email={email} UID={UID} />} />
          <Route path="/your-icons" element={<YourIcons email={email} UID={UID} />} />
          <Route path="/add-credits" element={<AddCredits email={email} UID={UID} />} />
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

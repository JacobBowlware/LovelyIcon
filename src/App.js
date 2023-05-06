import React from 'react';

// React Router
import {
  Route, RouterProvider, createBrowserRouter,
  createRoutesFromElements, Outlet
} from 'react-router-dom';

// Components
import Home from './components/pages/Home.jsx';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Profile from './components/pages/Profile.jsx';


// CSS
import './components/css/App.css';
import './components/css/Home.css';
import './components/css/Header.css';
import './components/css/Footer.css';
import './components/css/Profile.css';
import ProtectedRoutes from './components/common/ProtectedRoutes.js';


//TODO: 
// 1. Add a profile page
// 2. Add a logout button
// 3. Add a dashboard page
// 4. Add a settings page
// 5. Add a forgot password page
// 6. Implement reset-password email
// 7. Add a 404 page


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

  console.log(localStorage.getItem('user'));

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

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

// CSS
import './components/css/App.css';
import './components/css/Home.css';
import './components/css/Header.css';
import './components/css/Footer.css';
import './components/css/Login.css';


//TODO: 
// 1. Add a login page
// 2. Add a register page
// 3. Add a profile page
// 4. Add a logout button
// 5. Add a dashboard page
// 6. Add a settings page
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
        <Route index element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
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

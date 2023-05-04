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

// CSS
import './components/css/App.css';
import './components/css/Home.css';
import './components/css/Header.css';

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
        <Route path="*" element={<Home />} />
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

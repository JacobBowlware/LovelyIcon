// React
import React, { useState } from 'react';
import {
  Route, RouterProvider, createBrowserRouter,
  createRoutesFromElements, Outlet
} from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop.js';

// Firebase
import { app, auth } from './firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

// Pages
import Home from './components/pages/Home.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Profile from './components/pages/Profile.jsx';
import MyIcons, { MyIconsLoader } from './components/pages/MyIcons.jsx';
import AddCredits from './components/pages/AddCredits.jsx';
import IconGenerator from './components/pages/IconGenerator.jsx';
import PaymentFailure from './components/pages/PaymentFailure.jsx';
import PaymentSuccess from './components/pages/PaymentSuccess.jsx';
import EmailVerification from './components/pages/EmailVerification.jsx';

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
import './components/css/MyIcons.css';
import './components/css/AddCredits.css';
import './components/css/Icon.css';
import './components/css/PaymentPages.css';

const db = getFirestore(app);

function App() {
  const [email, setEmail] = useState("");
  const [UID, setUID] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUID(user.uid);
      setEmail(user.email);
      getCreditAmount(user.uid);

    } else {
      // User is signed out
    }
  });

  const getCreditAmount = async (UID) => {
    const docRef = doc(db, "users", UID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCreditAmount(docSnap.data().credits);
    }
    else {
      // doc.data() will be undefined in this case
    }
  }

  const Root = () => {
    return <>
      <Header email={email} />
      <ScrollToTop />
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
          <Route path="/profile" element={<Profile email={email} UID={UID} creditAmount={creditAmount} />} />
          <Route path="/icon-generator" element={<IconGenerator UID={UID} creditAmount={creditAmount} />} />
          <Route path="/icons" element={<MyIcons email={email} UID={UID} />} loader={() => MyIconsLoader(UID)} />
          <Route path="/add-credits" element={<AddCredits creditAmount={creditAmount} UID={UID} />} />
          <Route path="/payment-fail" element={<PaymentFailure />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/email-verification" element={<EmailVerification UID={UID} getCreditAmount={() => getCreditAmount()} />} />
        </Route>
        <Route index element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login UID={UID} />} />
        <Route path="/sign-up" element={<Signup UID={UID} />} />
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
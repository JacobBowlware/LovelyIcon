import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase/config';
import { addNewUserCredits, creditsAdded } from '../../firebase/HandleNewUser';

const EmailVerification = ({ UID }) => {
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('pending');

    useEffect(() => {
        const checkEmailVerificationStatus = async () => {
            const user = auth.currentUser;
            if (user && user.emailVerified) {
                const credsAdded = await creditsAdded(UID);

                // Email is verified
                if (!credsAdded) {
                    await addNewUserCredits(UID);
                }

                setVerificationStatus('success');
                navigate('/icon-generator/');
                window.location.reload();
            } else {
                // Email is not verified
                setVerificationStatus('pending');
            }
        };

        checkEmailVerificationStatus();

        const intervalId = setInterval(() => {
            auth.currentUser.reload().then(() => {
                checkEmailVerificationStatus();
            });
        }, 30000);

        return () => {
            clearInterval(intervalId);
        };
    }, [UID, navigate]);

    const handleContinue = () => {
        navigate('/icon-generator/');
        window.location.reload();
    };

    return (
        <div className="container form-container">
            <div className="form">
                {verificationStatus === 'pending' && (
                    <>
                        <h1 className="form__header email-verif-form__header">Please Verify Your Email</h1>
                        <p className="form__body">A verification email has been sent to your email address. Please check your inbox and click on the verification link to activate your account.</p>
                        <p className="form__body">If you haven't received the email, make sure to check your spam folder.</p>
                        <p className="form__body">Please allow up to 30 seconds after clicking the link for your verification status to change.</p>
                    </>
                )}
                {verificationStatus === 'success' && (
                    <>
                        <h1 className="form__header email-verif-form__header">Email Verified!</h1>
                        <p className="form__body-center">Your email has been successfully verified and 5 credits have been added to your account.</p>
                        <btn onClick={handleContinue} className="btn btn-primary form__btn" href="/icon-generator/">
                            Continue to LovelyIcon
                        </btn>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;

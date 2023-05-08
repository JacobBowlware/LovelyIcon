import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function Logout(navigate) {
    signOut(auth).then(() => {
        navigate('/login');
        window.location.reload();
    }).catch((error) => {
        alert(error);
    });
}
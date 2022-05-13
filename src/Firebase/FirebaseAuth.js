import { app } from './FirebaseConfig';
import { getAuth, signOut, GoogleAuthProvider } from 'firebase/auth';
const auth = getAuth(app);

const logOut = () => {
	try {
		signOut(auth);
	} catch (error) {
		console.log(error);
	}
};

const provider = new GoogleAuthProvider();
const googleAuth = async () => {};

export { logOut, googleAuth, auth, provider };

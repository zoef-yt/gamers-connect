import { app } from './FirebaseConfig';
import {
	getAuth,
	signOut,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { addUserToTheDB } from './FirebaseFirestore';
const auth = getAuth(app);
const defaultImage =
	'https://firebasestorage.googleapis.com/v0/b/react-testing-firebase-39d5e.appspot.com/o/defaultImages%2Fdefault.jpg?alt=media&token=1f3c0b1d-9d99-406b-b524-f6e278f7c5c7';

const getNewUserObject = (currentUser) => {
	return {
		displayName: currentUser.displayName,
		uid: currentUser.uid,
		photoURL: currentUser.photoURL,
		email: currentUser.email,
		followers: 0,
		following: 0,
		posts: 0,
		bio: '',
		url: '',
		backgroundImageUrl: '',
	};
};
const emailSignUpHandler = async (errorHandler, setIsLoading, setTextFields, textFields) => {
	const { email, password, confirmPassword, name } = textFields;
	if (name.length < 2) {
		setTextFields({ ...textFields, nameError: true });
		errorHandler(true, 'Name must be atleast 2 characters long');
		return;
	}
	if (email.length === 0) {
		setTextFields({ ...textFields, emailError: true });
		errorHandler(true, 'Email is required');
		return;
	}
	if (
		!email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			)
	) {
		errorHandler(true, 'Email is invalid');
		setTextFields({ ...textFields, emailError: true });
		return;
	}
	if (password.length < 6) {
		errorHandler(true, 'Password cannot be shorter than 6 characters');
		setTextFields({ ...textFields, passWordError: true });
		return;
	}
	if (confirmPassword.length < 6) {
		setTextFields({ ...textFields, confirmPasswordError: true });
		errorHandler(true, 'Confirm Password cannot be shorter than 6 characters');
		return;
	}
	if (password !== confirmPassword) {
		setTextFields({
			...textFields,
			confirmPasswordError: true,
			passWordError: true,
		});
		errorHandler(true, 'Password and Confirm Password must be same');
		return;
	}

	//
	try {
		setIsLoading(true);
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: defaultImage,
		});
		const currentUser = auth.currentUser;
		await addUserToTheDB(auth.currentUser.uid, getNewUserObject(currentUser));
		setIsLoading(false);
	} catch (error) {
		logOut();
		errorHandler(true, error.message);
		setIsLoading(false);
	}
};

const emailLoginHandler = async (errorHandler, setIsLoading, setTextFields, textFields) => {
	const { email, password } = textFields;

	if (email.length < 0) {
		setTextFields({ ...textFields, emailError: true });
		errorHandler(true, 'Email is required');
		return;
	}
	if (
		!email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			)
	) {
		errorHandler(true, 'Email is invalid');
		setTextFields({ ...textFields, emailError: true });
		return;
	}

	if (password.length < 6) {
		errorHandler(true, 'Password cannot be shorter than 6 characters');
		setTextFields({ ...textFields, passWordError: true });
		return;
	}
	errorHandler(false, '');
	try {
		setIsLoading(true);
		await signInWithEmailAndPassword(auth, email, password);
		setIsLoading(false);
	} catch (error) {
		console.log(error.message);
		errorHandler(true, error.message);
		setIsLoading(false);
	}
};

const provider = new GoogleAuthProvider();
const googleAuthHandler = async (setIsLoading, errorHandler) => {
	errorHandler(false, '');

	try {
		setIsLoading(true);
		await signInWithPopup(auth, provider);
		const currentUser = auth.currentUser;
		await addUserToTheDB(auth.currentUser.uid, getNewUserObject(currentUser));
		setIsLoading(false);
	} catch (error) {
		errorHandler(true, error.message);
		setIsLoading(false);
	}
};

const logOut = () => {
	try {
		signOut(auth);
	} catch (error) {
		console.log(error);
	}
};

export { logOut, googleAuthHandler, auth, provider, emailSignUpHandler, emailLoginHandler };

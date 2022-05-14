import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../Firebase/FirebaseAuth';
import { getSpecificUser } from '../../Firebase/FirebaseFirestore';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState();
	const [isLoginForm, setIsLoginForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({ hasError: false, errorMessage: '' });

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
				const authenticatedUser = await getSpecificUser(user.uid);
				setAuthUser(authenticatedUser);
			} else {
				setAuthUser(null);
			}
		});
	}, []);

	const switchAuthMode = () => {
		setIsLoginForm((prev) => !prev);
	};

	const errorHandler = (hasError, message) => {
		setError({ hasError: hasError, errorMessage: message });
	};

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser, isLoginForm, isLoading, switchAuthMode, setIsLoading, errorHandler, error }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

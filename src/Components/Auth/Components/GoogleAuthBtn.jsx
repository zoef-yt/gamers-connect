import { signInWithPopup } from 'firebase/auth';
import { GoogleLogoIcon } from '../../../Assets/AllSVG';
import { useAuth } from '../../../Context';
import { auth, provider } from '../../../Firebase/FirebaseAuth';

const GoogleAuthBtn = () => {
	const { setAuthUser, isLoading, setIsLoading, errorHandler } = useAuth();
	const googleAuthHandler = async () => {
		errorHandler(false, '');

		try {
			setIsLoading(true);
			const result = await signInWithPopup(auth, provider);
			setAuthUser(result.user.providerData[0]);
			setIsLoading(false);
		} catch (error) {
			errorHandler(true, error.message);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h5 className='text-align-center'>or</h5>
			<button onClick={() => (!isLoading ? googleAuthHandler() : null)} className={`btn google-btn ${isLoading && 'btn-disabled'}`}>
				<GoogleLogoIcon /> {isLoading ? 'Loading.....' : 'Continue with Google'}
			</button>
		</div>
	);
};

export { GoogleAuthBtn };

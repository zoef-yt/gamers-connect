import { GoogleLogoIcon } from '../../../Assets/AllSVG';
import { useAuth } from '../../../Context';
import { googleAuthHandler } from '../../../Firebase/FirebaseAuth';

const GoogleAuthBtn = () => {
	const { isLoading, setIsLoading, errorHandler } = useAuth();

	return (
		<div>
			<h5 className='text-align-center'>or</h5>
			<button
				onClick={() => (!isLoading ? googleAuthHandler(setIsLoading, errorHandler) : null)}
				className={`btn google-btn ${isLoading && 'btn-disabled'}`}
			>
				<GoogleLogoIcon /> {isLoading ? 'Loading.....' : 'Continue with Google'}
			</button>
		</div>
	);
};

export { GoogleAuthBtn };

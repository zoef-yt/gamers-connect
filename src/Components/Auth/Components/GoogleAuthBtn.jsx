import { GoogleLogoIcon } from '../../../Assets/AllSVG';
import { googleAuthHandler } from '../../../Firebase/FirebaseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setError } from '../../../store/Auth/AuthSlice';
const GoogleAuthBtn = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((store) => store.auth);

	const errorHandler = (hasError, message) => {
		dispatch(setError({ hasError: hasError, errorMessage: message }));
	};
	return (
		<div>
			<h5 className='text-align-center'>or</h5>
			<button
				onClick={() => (!isLoading ? googleAuthHandler(errorHandler, setIsLoading, dispatch) : null)}
				className={`btn google-btn ${isLoading && 'btn-disabled'}`}
			>
				<GoogleLogoIcon /> {isLoading ? 'Loading.....' : 'Continue with Google'}
			</button>
		</div>
	);
};

export { GoogleAuthBtn };

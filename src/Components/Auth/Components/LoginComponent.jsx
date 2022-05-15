import { emailLoginHandler } from '../../../Firebase/FirebaseAuth';
import { GoogleAuthBtn } from './GoogleAuthBtn';
import { InputField } from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoginForm, setIsLoading, setError } from '../../../store/Auth/AuthSlice';

const LoginComponent = ({ className, setUserDetails, textFields, showPassword, togglePassword, setTextFields, testUser }) => {
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector((store) => store.auth);

	const errorHandler = (hasError, message) => {
		dispatch(setError({ hasError: hasError, errorMessage: message }));
	};
	return (
		<div className={className} autoComplete='on'>
			<h1>Log in</h1>

			<div className='input-group'>
				<InputField
					labelText='Email Address'
					type='email'
					name='email'
					onChange={setUserDetails}
					hasError={textFields.emailError}
					value={textFields.email}
				/>

				<InputField
					labelText='Password'
					type={!showPassword.password ? 'password' : 'text'}
					name='password'
					onChange={setUserDetails}
					hasError={textFields.passWordError}
					value={textFields.password}
					passwordType={'password'}
					onClick={togglePassword}
				/>
			</div>

			<p
				onClick={() =>
					setTextFields({
						...textFields,
						password: testUser.password,
						email: testUser.email,
					})
				}
				className='btn btn-link'
			>
				Test Credentials
			</p>

			<button
				onClick={() => (!isLoading ? emailLoginHandler(errorHandler, setIsLoading, dispatch, setTextFields, textFields) : null)}
				className={`btn modal-button ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
			>
				{isLoading ? 'Loading...' : 'Login'}
			</button>
			{error.hasError && <p className='error-text'> *{error.errorMessage} </p>}
			<button
				onClick={() => {
					dispatch(setIsLoginForm());
				}}
				className='btn-link btn'
			>
				Don't have account? Sign up!
			</button>

			<GoogleAuthBtn />
		</div>
	);
};

export { LoginComponent };

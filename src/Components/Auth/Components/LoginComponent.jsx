import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../../Context';
import { auth } from '../../../Firebase/FirebaseAuth';
import { GoogleAuthBtn } from './GoogleAuthBtn';
import { InputField } from './InputField';
const LoginComponent = ({ className, setUserDetails, textFields, showPassword, togglePassword, setTextFields, testUser }) => {
	const { isLoading, switchAuthMode, error, errorHandler, setIsLoading } = useAuth();

	const loginHandler = async () => {
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

			<button onClick={() => (!isLoading ? loginHandler() : null)} className={`btn modal-button ${isLoading ? 'btn-disabled' : 'btn-primary'}`}>
				{isLoading ? 'Loading...' : 'Login'}
			</button>
			{error.hasError && <p className='modal-error'> *{error.errorMessage} </p>}
			<button onClick={switchAuthMode} className='btn-link btn'>
				Don't have account? Sign up!
			</button>

			<GoogleAuthBtn />
		</div>
	);
};

export { LoginComponent };

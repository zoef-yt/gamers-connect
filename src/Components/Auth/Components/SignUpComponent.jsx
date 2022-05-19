import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../../Context';
import { auth } from '../../../Firebase/FirebaseAuth';
import { GoogleAuthBtn } from './GoogleAuthBtn';
import { InputField } from './InputField';

const SignUpComponent = ({ className, setUserDetails, textFields, showPassword, togglePassword, setTextFields }) => {
	const { isLoading, switchAuthMode, error, errorHandler, setIsLoading } = useAuth();
	const signUpHandler = async () => {
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

		try {
			setIsLoading(true);
			await createUserWithEmailAndPassword(auth, email, password);
			setIsLoading(false);
		} catch (error) {
			errorHandler(true, error.message);
			setIsLoading(false);
		}
	};
	return (
		<div className={className} autoComplete='on'>
			<h1>Sign Up</h1>

			<div className='input-group'>
				<InputField
					labelText='Name'
					type='text'
					name='name'
					onChange={setUserDetails}
					value={textFields.name}
					hasError={textFields.nameError}
				/>
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
				<InputField
					labelText='Confirm password'
					type={!showPassword.confirmPassword ? 'password' : 'text'}
					name='confirmPassword'
					onChange={setUserDetails}
					hasError={textFields.confirmPasswordError}
					value={textFields.confirmPassword}
					onClick={togglePassword}
					passwordType={'confirmPassword'}
				/>
			</div>
			<button
				onClick={() => (!isLoading ? signUpHandler() : null)}
				className={`btn modal-button ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
			>
				{isLoading ? 'Loading...' : 'SignUp'}
			</button>
			{error.hasError && <p className='error-text'> *{error.errorMessage} </p>}
			<button onClick={switchAuthMode} className=' btn-link btn'>
				Already have account? Log In!
			</button>
			<GoogleAuthBtn />
		</div>
	);
};

export { SignUpComponent };

import { useAuth } from '../../../Context';
import { emailSignUpHandler } from '../../../Firebase/FirebaseAuth';
import { GoogleAuthBtn } from './GoogleAuthBtn';
import { InputField } from './InputField';

const SignUpComponent = ({ className, setUserDetails, textFields, showPassword, togglePassword, setTextFields }) => {
	const { isLoading, switchAuthMode, error, errorHandler, setIsLoading } = useAuth();

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
				onClick={() => (!isLoading ? emailSignUpHandler(errorHandler, setIsLoading, setTextFields, textFields) : null)}
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

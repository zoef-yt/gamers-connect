import { useAuth } from '../../../Context';
import { emailLoginHandler } from '../../../Firebase/FirebaseAuth';
import { GoogleAuthBtn } from './GoogleAuthBtn';
import { InputField } from './InputField';
const LoginComponent = ({ className, setUserDetails, textFields, showPassword, togglePassword, setTextFields, testUser }) => {
	const { isLoading, switchAuthMode, error, errorHandler, setIsLoading } = useAuth();

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
				onClick={() => (!isLoading ? emailLoginHandler(errorHandler, setIsLoading, setTextFields, textFields) : null)}
				className={`btn modal-button ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
			>
				{isLoading ? 'Loading...' : 'Login'}
			</button>
			{error.hasError && <p className='error-text'> *{error.errorMessage} </p>}
			<button onClick={switchAuthMode} className='btn-link btn'>
				Don't have account? Sign up!
			</button>

			<GoogleAuthBtn />
		</div>
	);
};

export { LoginComponent };

//@ts-check
import { useState } from 'react';
import { useAuth } from '../../Context';
import './Auth.css';
import { LoginComponent } from './Components/LoginComponent';
import { SignUpComponent } from './Components/SignUpComponent';
const Auth = () => {
	const { isLoginForm, errorHandler } = useAuth();
	const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

	const defaultText = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		nameError: false,
		emailError: false,
		passWordError: false,
		confirmPasswordError: false,
	};

	const testUser = {
		email: 'socialmediaguestuser@gmail.com',
		password: 'socialMediaGuestUser',
	};

	const [textFields, setTextFields] = useState(defaultText);

	const setUserDetails = (e) => {
		errorHandler(false, '');
		setTextFields({
			...textFields,
			[e.target.name]: e.target.value,
			nameError: false,
			emailError: false,
			passWordError: false,
			confirmPasswordError: false,
		});
	};

	const togglePassword = (name) => {
		setShowPassword({ ...showPassword, [name]: !showPassword[name] });
	};
	return (
		<div className='app-content '>
			<SignUpComponent
				className={` form ${isLoginForm ? 'form-out' : 'form-active'}`}
				setUserDetails={setUserDetails}
				textFields={textFields}
				showPassword={showPassword}
				togglePassword={togglePassword}
				setTextFields={setTextFields}
			/>

			<LoginComponent
				className={`form ${isLoginForm ? 'form-active' : 'form-out'}`}
				setUserDetails={setUserDetails}
				textFields={textFields}
				showPassword={showPassword}
				togglePassword={togglePassword}
				setTextFields={setTextFields}
				testUser={testUser}
			/>
		</div>
	);
};

export { Auth };

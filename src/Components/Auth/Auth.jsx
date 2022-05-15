import { useState } from 'react';
import './Auth.css';
import { LoginComponent } from './Components/LoginComponent';
import { SignUpComponent } from './Components/SignUpComponent';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../../store/Auth/AuthSlice';

const Auth = () => {
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
	const { isLoginForm } = useSelector((store) => store.auth);
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

	const errorHandler = (hasError, message) => {
		dispatch(setError({ hasError: hasError, errorMessage: message }));
	};
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
				className={`form ${isLoginForm ? 'form-out' : 'form-active'}`}
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

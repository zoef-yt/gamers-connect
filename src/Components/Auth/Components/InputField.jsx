import { HidePasswordEyeIcon, ShowPasswordEyeIcon } from '../../../Assets/AllSVG.jsx';
const InputField = ({ labelText, type, name, onChange, value, hasError, onClick, passwordType }) => {
	return (
		<div className='relative'>
			{labelText.toLowerCase().includes('password') &&
				(type === 'password' ? (
					<ShowPasswordEyeIcon className='password-icon' onClick={() => onClick(passwordType)} />
				) : (
					<HidePasswordEyeIcon className='password-icon' onClick={() => onClick(passwordType)} />
				))}

			<input
				className={`text-field ${hasError && 'text-field-error'} `}
				autoComplete='off'
				type={type}
				name={name}
				placeholder={labelText}
				onChange={onChange}
				value={value}
				required
			/>
		</div>
	);
};

export { InputField };

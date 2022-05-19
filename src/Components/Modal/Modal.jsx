import { useDispatch, useSelector } from 'react-redux';
import './Modal.css';
import { closeModal } from '../../store/Modal/ModalSlice';
import { useState } from 'react';
import { updateUserDetails } from '../../store/Auth/AuthSlice';
import { CreatePostsCard } from './ModalComponent/CreatePostsCard';
function ModalComponent() {
	const { isModalOpened, modalType } = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const setModalData = (modalType) => {
		switch (modalType) {
			case 'FirstComponent':
				return <EditComponent />;

			case 'CreatePostsCard':
				return <CreatePostsCard />;
			default:
				dispatch(closeModal());
				return null;
		}
	};
	return (
		<div onClick={() => dispatch(closeModal())} className={`${isModalOpened ? 'modal-opened' : 'modal-close'}`}>
			{setModalData(modalType)}
		</div>
	);
}

export default ModalComponent;

const EditComponent = () => {
	const dispatch = useDispatch();
	const { authUser } = useSelector((store) => store.auth);
	const { bio, displayName, url } = authUser;
	const [userDetails, setUserDetails] = useState({ name: displayName, portfolioLink: url, biography: bio });

	const onChangeHandler = (e) => {
		setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
	};

	const onsubmitHandler = () => {
		dispatch(
			updateUserDetails({
				uid: authUser.uid,
				displayName: userDetails.name || 'User ',
				url: userDetails.portfolioLink || '',
				bio: userDetails.biography || '',
			}),
		);
		dispatch(closeModal());
	};

	return (
		<div className='modal-card' onClick={(e) => e.stopPropagation()}>
			<div className='text-align-center'>Edit profile </div>
			<div className='modal-card-body'>
				<label>
					Name:
					<input name='name' value={userDetails.name} onChange={onChangeHandler} type='text' className='text-field' placeholder='Name' />
				</label>

				<label>
					Bio:
					<textarea
						name='biography'
						value={userDetails.biography}
						onChange={onChangeHandler}
						className='text-field'
						placeholder='Bio'
						rows='4'
						cols='22'
						maxLength='250'
					/>
				</label>

				<label>
					Link:
					<input
						name='portfolioLink'
						value={userDetails.portfolioLink}
						onChange={onChangeHandler}
						type='text'
						className='text-field'
						placeholder='Link'
					/>
				</label>
			</div>

			<div className='modal-card-footer'>
				<button
					className='btn btn-secondary '
					onClick={() => {
						onsubmitHandler();
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

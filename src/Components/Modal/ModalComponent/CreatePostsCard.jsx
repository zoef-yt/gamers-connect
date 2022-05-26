import './CreatePostsCard.css';
import '../Modal.css';
import { useState } from 'react';
import { AddImageIcon } from '../../../Assets/AllSVG.jsx';

import { createNewPost } from '../../../Firebase/FirebaseFirestore';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/Modal/ModalSlice';
export const CreatePostsCard = () => {
	const { authUser } = useSelector((store) => store.auth);
	const [createPostError, setCreatePostError] = useState({ hasError: false, errorMessage: '' });
	const dispatch = useDispatch();
	const [createPost, setCreatePost] = useState({
		caption: '',
		image: '',
	});

	const [isLoading, setLoading] = useState(false);

	const captionChangeHandler = (e) => {
		setCreatePostError({ hasError: false, errorMessage: '' });
		setCreatePost({ ...createPost, caption: e.target.value });
	};

	const imageChangeHandler = (e) => {
		if (e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png') {
			setCreatePostError({ hasError: true, errorMessage: 'Only jpeg or png file format supported' });
			return;
		}
		setCreatePostError({ hasError: false, errorMessage: '' });
		setCreatePost({ ...createPost, image: e.target.files[0] });
	};
	const createNewPostHandler = async () => {
		if (createPost.caption.trim() === '') {
			setCreatePostError({ hasError: true, errorMessage: 'Caption is required' });
			return;
		}

		const post = await createNewPost(
			authUser.uid,
			{
				caption: createPost.caption,
				image: createPost.image,
			},
			setLoading,
		);
		if (post === 'success') {
			setCreatePost({ caption: '', image: '' });
			dispatch(closeModal());
		}
	};
	return (
		<div className='modal-card relative' onClick={(e) => e.stopPropagation()}>
			{isLoading && <div className='loader-div'></div>}
			<div className='text-align-center'>Create Post </div>
			{createPostError.hasError && <div className='error-text text-align-center '>{createPostError.errorMessage}</div>}
			<div className='create-post-body'>
				<label>
					Caption
					<textarea
						name='caption'
						value={createPost.caption}
						onChange={captionChangeHandler}
						className='text-field'
						placeholder='Caption'
						rows='3'
						cols='22'
						maxLength='250'
						autoFocus
					/>
				</label>

				<label htmlFor='imageHolder'>
					<input
						id='imageHolder'
						name='image'
						type='file'
						accept='image/*'
						className='display-none'
						placeholder='Image'
						onChange={imageChangeHandler}
					/>
					{createPost.image ? 'Image Preview' : 'Add Image'}
					<div className='image-holder text-field'>
						{createPost.image ? (
							<img src={URL.createObjectURL(createPost.image)} alt={createPost.image.name} className='image-preview' />
						) : (
							<div className='image-preview'>
								<AddImageIcon />
							</div>
						)}
					</div>
				</label>
			</div>
			<div className='modal-card-footer'>
				<button
					className='btn btn-secondary '
					onClick={() => {
						createNewPostHandler();
					}}
				>
					Create
				</button>
			</div>
		</div>
	);
};

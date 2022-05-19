import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreatePostIcon } from '../Assets/AllSVG';
import { openModal } from '../store/Modal/ModalSlice';

export const CreateNewPostBtn = () => {
	const { authUser } = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<button
			className='btn btn-fab'
			onClick={() => {
				authUser ? dispatch(openModal('CreatePostsCard')) : navigate('/auth');
			}}
		>
			<CreatePostIcon />
		</button>
	);
};

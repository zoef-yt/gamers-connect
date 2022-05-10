import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
	const navigate = useNavigate();
	return (
		<div className='app page-not-found'>
			<h1 className='text-404'>404</h1>
			<h1> Oh! How did you get here? Nothing to see here</h1>
			<button onClick={() => navigate('/')} className='btn btn-primary'>
				Go to home
			</button>
		</div>
	);
};

export { PageNotFound };

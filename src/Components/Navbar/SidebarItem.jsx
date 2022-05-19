import { useNavigate } from 'react-router-dom';

const SideBarItem = ({ close, icon, text, navigateTo }) => {
	const navigate = useNavigate();
	const changePage = () => {
		close();
		navigate(navigateTo);
	};
	return (
		<div title={text} onClick={changePage} className='sidebar-item'>
			{icon}
			<p>{text}</p>
		</div>
	);
};

export { SideBarItem };

import { Footer, Navbar } from './Components';
import './index.css';
function App() {
	return (
		<div className='app'>
			<Navbar />
			<div className='app-main-content'></div>
			<Footer />
		</div>
	);
}

export { App };

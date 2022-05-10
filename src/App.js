import { Footer, Navbar } from './Components';
import { AppRoutes } from './Components/Router/Router';
import './index.css';
function App() {
	return (
		<div className='app'>
			<Navbar />
			<AppRoutes />
			<Footer />
		</div>
	);
}

export { App };

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from './Context/Provider';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Providers>
				<Provider store={store}>
					<App />
				</Provider>
			</Providers>
		</BrowserRouter>
	</React.StrictMode>,
);

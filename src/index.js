import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from './Context/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Providers>
				<App />
			</Providers>
		</BrowserRouter>
	</React.StrictMode>,
);

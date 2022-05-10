import { ThemeProvider, UserProvider } from './index';

const Providers = ({ children }) => {
	return (
		<ThemeProvider>
			<UserProvider>{children}</UserProvider>
		</ThemeProvider>
	);
};

export { Providers };

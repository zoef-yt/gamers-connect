import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');
	const toggleTheme = () => {
		setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
		if (theme === 'light') {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	};
	useEffect(() => {
		const localTheme = localStorage.getItem('theme');
		if (localTheme) {
			document.documentElement.setAttribute('data-theme', localTheme);
			setTheme(localTheme);
		} else {
			localStorage.setItem('theme', 'light');
			document.documentElement.setAttribute('data-theme', 'light');
		}
	}, []);

	return <ThemeContext.Provider value={{ toggleTheme, theme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
